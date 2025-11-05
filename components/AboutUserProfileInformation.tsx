import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  position: z
    .string()
    .max(250, "field too long, reduce to250 characters")
    .optional(),
  bio: z.string().min(2, "field too short, enter more than 2 character."),
  fb: z.url().optional(),
  twitter: z.url().optional(),
  linkedIn: z.url().optional(),
});

const AboutUserProfileInformation = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      bio: "",
      fb: "",
      twitter: "",
      linkedIn: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const about = {};

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: values.position,
          bio: values.bio,
          twitter: values.twitter,
          fb: values.fb,
          linkedIn: values.linkedIn,
        }),
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2">
          <FaRegEdit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[999] h-[35rem] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit profile about</DialogTitle>
          <DialogDescription>
            Make changes to the about profile here, you can only change the name
            in the settings!!!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter position in organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Bio in organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Profile Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter facebook link/url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Profile Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter twitter link/url in organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter linkedIn link/url in organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUserProfileInformation;
