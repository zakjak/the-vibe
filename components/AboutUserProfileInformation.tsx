import React, { useEffect, useState } from "react";
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
import { useAbout, useUpdateUserProfile } from "@/hooks/useUsers";

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
  const [open, setOpen] = useState(false);
  const { data } = useAbout(userId);
  const { mutate } = useUpdateUserProfile(userId);

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

  useEffect(() => {
    if (data) {
      form.reset({
        position: data[0]?.postion || "",
        bio: data[0]?.bio || "",
        fb: data[0]?.fb || "",
        twitter: data[0]?.twitter || "",
        linkedIn: data[0]?.linkedIn || "",
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userInfo = {
      position: values.position,
      bio: values.bio,
      twitter: values.twitter,
      fb: values.fb,
      linkedIn: values.linkedIn,
    };

    mutate(userInfo);

    setOpen(false);
  };

  return (
    <Dialog modal={false} onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="mt-2">
          <FaRegEdit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="z-999 h-140 overflow-y-scroll">
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
