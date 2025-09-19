"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { FormEvent } from "react";
import { pool } from "@/app/db/schema";

const formSchema = z.object({
  title: z.string().min(1).max(250),
  story: z.string().min(1),
});

const AdminForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      story: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>, e: FormEvent) => {
    e.preventDefault();

    await fetch("/api/articles", {
      method: "POST",
      title: values.story,
      story: values.story,
    });
  };

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="story"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story</FormLabel>
              <FormControl>
                <Input placeholder="story" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default AdminForm;
