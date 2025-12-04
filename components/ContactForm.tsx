"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  company: z
    .string()
    .min(1, { message: "Company/Organization cannot be empty" }),
  website: z.url(),
  industry: z.string(),
  contactName: z
    .string()
    .min(1, { message: "Company/Organization cannot be empty" }),
  message: z
    .string()
    .min(1, { message: "Company/Organization cannot be empty" }),
  email: z.email().min(1, { message: "Company/Organization cannot be empty" }),
  address: z.string(),
  phone: z.string(),
  country: z.string(),
  region: z
    .string()
    .min(1, { message: "Company/Organization cannot be empty" }),
  city: z.string(),
  zipCode: z.string(),
});
const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      website: "",
      industry: "",
      contactName: "",
      message: "",
      email: "",
      address: "",
      phone: "",
      country: "",
      region: "",
      city: "",
      zipCode: "",
    },
  });

  function onSubmut(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmut)}
        className="text-zinc-800 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">
                Company/Organization
              </FormLabel>
              <FormControl>
                <Input
                  className="border border-zinc-400"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider">
                  Website (optional)
                </FormLabel>
                <FormControl>
                  <Input className="border border-zinc-400" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider">
                  Industry (optional)
                </FormLabel>
                <FormControl>
                  <Input className="border border-zinc-400" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">Contact Name</FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">Message</FormLabel>
              <FormControl>
                <Textarea className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">Email</FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">
                Address (optional)
              </FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">Phone (optional)</FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">
                Country (optional)
              </FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">State/Region</FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">City (optional)</FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider">
                Zip Code (optional)
              </FormLabel>
              <FormControl>
                <Input className="border border-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="secondary"
          type="submit"
          className="cursor-pointer shadow-lg"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
