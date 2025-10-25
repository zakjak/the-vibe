import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
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
  story: z.array(z.any()).nonempty("Story is required"),
  tags: z.array(z.string()).nonempty(),
  images: z
    .union([z.array(z.instanceof(File)), z.array(z.string())])
    .optional(),
  author: z.string().min(1, { message: "Author is required" }),
});

export type form = z.infer<typeof formSchema>;

({
  resolver: zodResolver(formSchema),
  defaultValues: {},
});
