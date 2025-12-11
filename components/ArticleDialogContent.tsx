"use client";

import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateArticle, useEditArticle } from "@/hooks/useCreatedArticles";
import dynamic from "next/dynamic";
import { useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Command, CommandInput, CommandItem } from "./ui/command";
import { Input } from "./ui/input";
import { Form } from "@/components/ui/form";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/lib/types/users";
import z from "zod";
import { useArticle } from "@/hooks/useArticle";
import { Article } from "@/lib/types/article";

const EditorComponent = dynamic(
  () => import("../components/TextEditor/SlateEditor"),
  {
    ssr: false,
  }
);

export const imageSchema = z.object({
  file: z.union([z.instanceof(File), z.string().url()]),
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
  story: z
    .string()
    .transform((value) => {
      if (!value || value.trim() === "") {
        return JSON.stringify([{ type: "p", children: [{ text: "" }] }]);
      }
      return value;
    })
    .refine(
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
  images: z.array(imageSchema).optional(),
  authors: z.array(z.string()).min(1, "Select at least one author"),
});

export type ArticleFormData = z.infer<typeof formSchema>;

const ArticleDialogContent = ({
  user,
  openEdit,
  articleId,
  setOpenEdit,
}: {
  user: User;
  openEdit?: boolean;
  articleId?: number;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputTagRef = useRef<HTMLInputElement | null>(null);
  const { data: users, isLoading } = useUsers();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { data } = useArticle(articleId as number);

  const { mutate } = useCreateArticle(user?.id);
  const { mutate: mutateEditArticle } = useEditArticle();

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

  const convertDbImages = (urls: string[], titles: string[]) => {
    return urls.map((url, i) => ({
      file: url, // <-- URL, not File
      title: titles?.[i] || "",
    }));
  };

  useEffect(() => {
    if (openEdit && data?.article[0]) {
      const article = data.article[0];

      const dbImages = convertDbImages(article.images, article.imagesTitle);

      form.reset({
        ...article,
        images: dbImages,
      });
      setImagePreview(article?.image);
      setTags(article?.tags);
    } else {
      form.reset({
        title: "",
        image: "",
        category: "",
        authors: [],
        imageCredit: "",
        imageTitle: "",
        story: "",
        tags: [],
        images: [],
      });
    }
  }, [openEdit, data, form]);

  const removeImagePreview = () => {
    form.setValue("image", null);
    setImagePreview(null);
  };

  const categories = [
    "politics",
    "sports",
    "entertainment",
    "business",
    "technology",
    "culture",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = "";
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
    if (!e.target.files) return;

    const fileArray = Array.from(e.target.files);
    fileArray.forEach((file) => append({ file, title: "" }));

    e.target.value = "";
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    isDraft: boolean
  ) => {
    setIsSubmitting(true);

    const formData = new FormData();

    if (values.image && values.image instanceof File) {
      formData.append("image", values?.image);
    }

    values?.images?.forEach((file) => {
      if (file.file instanceof File) {
        formData.append("images", file.file);
      }
    });

    try {
      const responseUpload = await fetch(`/api/uploadImages`, {
        method: "POST",
        body: formData,
      });

      if (responseUpload) {
        const resultUploads = await responseUpload.json();

        if (imagePreview?.startsWith("https")) {
          const images = resultUploads;

          const imagesUrl: string[] = [];

          for (let i = 0; i < images.length; i++) {
            imagesUrl.push(images[i].result.variants[1]);
          }

          values?.images?.forEach((image) => {
            if (!(image.file instanceof File)) {
              imagesUrl.push(image.file);
            }
          });

          const imagesTitle: string[] = [];

          values?.images?.forEach((image) => imagesTitle.push(image.title));

          if (!openEdit) {
            const {
              title,
              imageTitle,
              imageCredit,
              category,
              tags,
              authors,
              story,
              image,
            } = values;

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
              isDraft,
              imagesTitle,
            };

            mutate(article as Article);
            setIsSubmitting(false);
            setOpenEdit(false);
          } else {
            const {
              title,
              imageTitle,
              imageCredit,
              category,
              tags,
              authors,
              image,
              story,
            } = values;
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
              isDraft,
              imagesTitle,
              articleId,
            };
            mutateEditArticle(article as Article);
            setIsSubmitting(false);
            setOpenEdit(false);
          }
        } else {
          const image = resultUploads[0].result.variants[1];

          const images = resultUploads.slice(1);

          const imagesUrl: string[] = [];

          for (let i = 0; i < images.length; i++) {
            imagesUrl.push(images[i].result.variants[1]);
          }

          values?.images?.forEach((image) => {
            if (!(image.file instanceof File)) {
              imagesUrl.push(image.file);
            }
          });

          const imagesTitle: string[] = [];

          values?.images?.forEach((image) => imagesTitle.push(image.title));

          if (!openEdit) {
            const {
              title,
              imageTitle,
              imageCredit,
              category,
              tags,
              authors,
              story,
            } = values;

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
              isDraft,
              imagesTitle,
            };
            mutate(article);
            setIsSubmitting(false);
            setOpenEdit(false);
          } else {
            const {
              title,
              imageTitle,
              imageCredit,
              category,
              tags,
              authors,
              story,
            } = values;
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
              isDraft,
              imagesTitle,
              articleId,
            };
            mutateEditArticle(article);
            setIsSubmitting(false);
            setOpenEdit(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setOpenEdit(false);
    } finally {
      setIsSubmitting(false);
      setIsSubmitting(false);
      setOpenEdit(false);
    }
  };

  return (
    <DialogContent
      role="dialog"
      aria-describedby={undefined}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        document.getElementById("title-input")?.focus();
      }}
      className="overflow-y-scroll h-160 z-999 w-[90%]"
    >
      <DialogHeader>
        <DialogTitle>Create article</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid gap-4" autoFocus>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
                  <FormControl>
                    <Input
                      id="title-input"
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
                      <FormControl>
                        <Input
                          {...form.register("image")}
                          accept="image/*"
                          onChange={handleImageChange}
                          type="file"
                        />
                      </FormControl>
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
                    <SelectContent className="z-999">
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
                {tags?.map((tag: string, idx: number) => (
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
                  let preview: string | null = null;

                  if (file instanceof File) {
                    preview = URL.createObjectURL(file);
                  } else if (typeof file === "string") {
                    preview = file;
                  }

                  const fallbackPreview =
                    !preview &&
                    imagesPreview?.[index] &&
                    imagesPreview[index].trim() !== ""
                      ? imagesPreview[index]
                      : null;

                  const finalPreview = preview || fallbackPreview;

                  return (
                    <div className="pb-4" key={field.id}>
                      {preview ? (
                        <div className="relative w-[70%]">
                          <Image
                            key={index}
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
                      ) : (
                        finalPreview && (
                          <div className="relative w-[70%]">
                            <Image
                              src={finalPreview}
                              alt="Preview"
                              width={240}
                              height={240}
                              className="object-cover rounded-lg w-full h-full"
                            />
                            <Button
                              variant="secondary"
                              className="absolute right-2 top-2 w-6 h-6 p-1"
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          </div>
                        )
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
                            <FormMessage />
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
                        const newSelection = field?.value?.includes(user.id)
                          ? field.value.filter((a) => a !== user.id)
                          : [...field.value, user.id];
                        field.onChange(newSelection);
                      }}
                    >
                      <span>{user?.name}</span>
                      {field?.value?.includes(user?.id) && <span>✅</span>}
                    </CommandItem>
                  ))}
                </Command>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={form.handleSubmit((v) => onSubmit(v, true))}
            >
              Save Draft
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={form.handleSubmit((v) => onSubmit(v, false))}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ArticleDialogContent;
