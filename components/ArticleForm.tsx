"use client";

import { Button } from "./ui/button";
import dynamic from "next/dynamic";

import { Input } from "./ui/input";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
// import {Command} from '@/components/ui/command'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useUsers } from "@/hooks/useUsers";
import { Command, CommandInput, CommandItem } from "./ui/command";
import { useCreateArticle } from "@/hooks/useCreatedArticles";

export const imageSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024),
  title: z.string().min(1, "Title required"),
});

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
  imageTitle: z
    .string()
    .min(2, { message: "Image title must be at least 2 characters" }),
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
  images: z.array(imageSchema).min(1, "At least one image required"),
  authors: z.array(z.string()).min(1, "Select at least one author"),
});

export type ArticleFormData = z.infer<typeof formSchema>;

const EditorComponent = dynamic(
  () => import("../components/TextEditor/SlateEditor"),
  {
    ssr: false,
  }
);

const ArticleForm = ({
  user,
  setError,
}: {
  user: User;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const inputTagRef = useRef<HTMLInputElement | null>(null);
  const [inputTagValue, setInputTagValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { mutate } = useCreateArticle(user?.id);

  const { data: users, isLoading } = useUsers();

  const categories = [
    "politics",
    "sports",
    "entertainment",
    "business",
    "technology",
    "culture",
  ];

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: undefined,
      imageTitle: "",
      category: "",
      imageCredit: "",
      story: "",
      tags: [],
      images: [],
      authors: [],
    },
  });

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
      const fileArray = Array.from(e.target.files);
      fileArray.forEach((file) => append({ file, title: "" }));
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();

    if (values.image) {
      formData.append("image", values?.image);
    }

    values?.images?.forEach((file) => formData.append("images", file.file));

    try {
      const responseUpload = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/uploadImages`,
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

        const {
          title,
          imageTitle,
          imageCredit,
          category,
          tags,
          authors,
          story,
        } = values;

        const imagesTitle: string[] = [];

        values?.images?.forEach((image) => imagesTitle.push(image.title));

        const article = {
          title,
          imageCredit,
          category,
          tags,
          authors,
          story: story,
          image: image,
          imageTitle,
          images: imagesUrl,
          imagesTitle,
        };

        mutate(article);

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
        setError(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsSubmitting(false);
      setError(false);
    }
  };

  return (
    <Dialog modal={false} onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Create Article</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="overflow-y-scroll h-[40rem] lg:w-[5000px] md:w-[40rem] w-[25rem] z-[999]"
      >
        <DialogHeader>
          <DialogTitle>Create article</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4" autoFocus>
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
                name="imageTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image title:</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("imageTitle")}
                        placeholder="Image title"
                        {...field}
                        className="w-full truncate"
                      />
                    </FormControl>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cateogory" />
                      </SelectTrigger>
                      <SelectContent className="z-[999]">
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

              {/* IMAGES TITLE SECTION */}
              <FormItem>
                <FormLabel>Images:</FormLabel>
                <Input
                  type="file"
                  accept="images/*"
                  multiple
                  onChange={handleImagesChange}
                />
                <div className="">
                  {fields.map((field, index) => {
                    const file = form.watch(`images.${index}.file`);
                    const preview = file ? URL.createObjectURL(file) : null;

                    return (
                      <div className="pb-4" key={field.id}>
                        {preview && (
                          <div className="relative w-[70%]" inert>
                            <Image
                              src={preview}
                              alt="Preview"
                              width={240}
                              height={240}
                              className="object-cover rounded-lg w-full h-full"
                            />
                            <Button
                              variant="secondary"
                              className="text-lg cursor-pointer w-4 h-4 p-4 flex items-center 
                            justify-center font-bold  absolute right-2 top-2 rounded-full shadow"
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          </div>
                        )}
                        <FormField
                          control={form.control}
                          name={`images.${index}.title`}
                          render={({ field }) => (
                            <FormItem className="pt-2">
                              <FormLabel>Title for Image {index + 1}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter image title ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </FormItem>

              {/* Authors */}
              <Controller
                name="authors"
                control={form.control}
                render={({ field }) => (
                  <Command>
                    <CommandInput placeholder="Select authors" />
                    {users?.map((user: User) => (
                      <CommandItem
                        key={user?.id}
                        onSelect={() => {
                          const newSelection = field.value.includes(user.id)
                            ? field.value.filter((a) => a !== user.id)
                            : [...field.value, user.id];
                          field.onChange(newSelection);
                        }}
                      >
                        <span>{user?.name}</span>
                        {field.value.includes(user?.id) && <span>✅</span>}
                      </CommandItem>
                    ))}
                  </Command>
                )}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
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
