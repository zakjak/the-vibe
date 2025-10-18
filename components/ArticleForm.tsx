"use client";

import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { User } from "@/lib/types/users";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 2 characters." })
    .max(250, {
      message: "TItle must be less than 250 characters.",
    }),
  image: z.union([
    z
      .custom<File>((file) => file instanceof File, "Image is required")
      .nullable(),
    z.string(),
  ]),
  category: z.string(),
  imageCredit: z
    .string()
    .min(1, { message: "Image credit must be at least 2 characters." })
    .max(250, { message: "Image credit must be less than 250 characters." }),
  story: z.string().refine(
    (value) => {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed);
      } catch {
        return false;
      }
    },
    { message: "Invalid content format" }
  ),
  tags: z.array(z.string()).nonempty(),
  images: z
    .union([z.array(z.instanceof(File)), z.array(z.string())])
    .optional(),
  author: z.string().min(1, { message: "Author is required" }),
});

const EditorComponent = dynamic(
  () => import("../components/TextEditor/SlateEditor"),
  {
    ssr: false,
  }
);

const ArticleForm = ({ user }: User) => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const inputTagRef = useRef<HTMLInputElement | null>(null);
  const [inputTagValue, setInputTagValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const categories = [
    "politics",
    "sports",
    "entertainment",
    "business",
    "technology",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: undefined,
      category: "",
      imageCredit: "",
      story: "",
      tags: [],
      images: [],
      author: "",
    },
  });

  useEffect(() => {
    if (userInfo?.user) {
      form.reset({
        ...form.getValues(),
        author: userInfo?.user.name,
      });
    }
  }, [userInfo, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImagePreview = () => {
    form.setValue("image", null);
    setImagePreview(null);
  };

  const addTag = () => {
    if (inputTagValue.trim() && !tags.includes(inputTagValue.trim())) {
      const newTags = [...tags, inputTagValue.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
    }
    setInputTagValue("");
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const currentImage = form.getValues("images");
      const newImages = [...((currentImage as File[]) ?? []), ...filesArray];
      form.setValue("images", newImages);
      setImagesPreview(newImages.map((f) => URL.createObjectURL(f)));
    }
  };

  const removeImagesPreview = (index: number) => {
    const currentGallery = form.getValues("images") || [];
    const newImages = currentGallery.filter((_, i) => i !== index);

    if (newImages.length === 0 || newImages[0] instanceof File) {
      form.setValue("images", newImages as File[]);
    } else {
      form.setValue("images", newImages as string[]);
    }
    setImagesPreview(
      newImages.map((f) => (f instanceof File ? URL.createObjectURL(f) : f))
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    if (values.image) {
      formData.append("image", values?.image);
    }

    values?.images?.forEach((file) => formData.append("images", file));

    const responseUpload = await fetch(
      "http://localhost:3000/api/uploadImages",
      {
        method: "POST",
        body: formData,
      }
    );

    if (responseUpload) {
      const resultUploads = await responseUpload.json();

      const image = resultUploads[0].result.variants[1];
      const images = resultUploads.slice(1);

      const imagesUrl: string[] = [];

      for (let i = 0; i < images.length; i++) {
        imagesUrl.push(images[i].result.variants[1]);
      }

      const { title, imageCredit, category, tags, author, story } = values;

      const article = {
        title,
        imageCredit,
        category,
        tags,
        author,
        story: story,
        image: image,
        images: imagesUrl,
        ownerId: userInfo?.userId,
      };

      const responseArticle = await fetch(
        "http://localhost:3000/api/createArticle",
        {
          method: "POST",
          body: JSON.stringify(article),
        }
      );

      const result = await responseArticle.json();

      form.reset({
        title: "",
        imageCredit: "",
        category: "",
        tags: [],
        story: "",
        image: "",
        images: [],
      });

      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Article</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-scroll h-[40rem] lg:w-[50rem] md:w-[40rem] w-[25rem] z-[999]"
      >
        <DialogHeader>
          <DialogTitle>Create article</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title:</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("title")}
                        placeholder="Title"
                        {...field}
                        className="w-full truncate"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Image:</FormLabel>
                    {!imagePreview ? (
                      <FormControl>
                        <Input
                          {...form.register("image")}
                          accept="image/*"
                          onChange={handleImageChange}
                          type="file"
                        />
                      </FormControl>
                    ) : (
                      <div className="w-64 mt-3 relative h-40">
                        <Image
                          src={imagePreview}
                          alt="image preview"
                          fill
                          className="object-cover rounded-xl"
                        />
                        <Button
                          variant="secondary"
                          onClick={removeImagePreview}
                          className="text-xl cursor-pointer w-5 h-5 p-4 flex items-center justify-center font-bold  absolute right-2 top-2 rounded-full shadow"
                        >
                          X
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cateogory:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...form.register("category")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a cateogory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageCredit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Credit:</FormLabel>
                    <FormControl>
                      <Input {...form.register("imageCredit")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* ========== Text Editor ========= */}
              <Controller
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story:</FormLabel>
                    <EditorComponent
                      // {...form.register("story")}
                      value={field.value}
                      setValue={form.setValue}
                    />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Tags:</FormLabel>
                <Input
                  {...form.register("tags")}
                  value={inputTagValue}
                  placeholder="Press enter button to add tag"
                  ref={inputTagRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  onChange={(e) => setInputTagValue(e.target.value)}
                />
                <div className="mt-2 flex gap-2">
                  {tags.map((tag: string, idx: number) => (
                    <Button key={idx} variant="outline">
                      {tag}
                      <span
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                      >
                        x
                      </span>
                    </Button>
                  ))}
                </div>
              </FormItem>

              {/* Other Images */}
              <FormItem>
                <FormLabel>Images:</FormLabel>
                <Input
                  type="file"
                  accept="images/*"
                  multiple
                  onChange={handleImagesChange}
                />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                  {imagesPreview.map((src, index) => (
                    <div className="relative w-32 mt-3 h-24" key={index}>
                      <Image
                        src={src}
                        alt={`gallery-${index}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => removeImagesPreview(index)}
                        className="text-lg cursor-pointer w-4 h-4 p-4 flex items-center 
                            justify-center font-bold  absolute right-2 top-2 rounded-full shadow"
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </FormItem>

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author:</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("author")}
                        {...field}
                        value={userInfo?.user?.name}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleForm;
