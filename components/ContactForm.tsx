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
import { useState } from "react";
import { useAddMessage } from "@/hooks/useContact";
import { TiTick } from "react-icons/ti";
import { sendMail } from "@/lib/utils/send-mail";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  company: z
    .string()
    .min(1, { message: "Company/Organization cannot be empty" }),
  website: z.string(),
  industry: z.string().min(1, { message: "Industry cannot be empty" }),
  title: z.string().min(1, { message: "Title is required" }),
  contactName: z.string().min(1, { message: "Name cannot be empty" }),
  message: z.string().min(1, { message: "Message cannot be empty" }),
  email: z.email().min(1, { message: "Company/Organization cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  phone: z.string().min(1, { message: "Phone cannot be empty" }),
  country: z.string().min(1, { message: "Country cannot be empty" }),
  state: z.string().min(1, { message: "State/Region cannot be empty" }),
  city: z.string().min(1, { message: "City cannot be empty" }),
  zipCode: z.string(),
});
const ContactForm = () => {
  const [isSubmittied, setIsSubmitted] = useState(false);
  const { mutate } = useAddMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      website: "",
      industry: "",
      title: "",
      contactName: "",
      message: "",
      email: "",
      address: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
  });

  async function onSubmut(values: z.infer<typeof formSchema>) {
    setIsSubmitted(false);

    try {
      mutate(values);

      const mailText = `
                📩 New Advertising / Sponsorship Request

                A new inquiry has been submitted on TheVybeNews.

                ────────────────────────────────────────

                COMPANY INFORMATION
                Company: ${values.company}
                Website: ${values.website || "Not provided"}
                Industry: ${values.industry}

                ────────────────────────────────────────

                CONTACT PERSON
                Name: ${values.title} ${values.contactName}
                Email: ${values.email}
                Phone: ${values.phone}

                ────────────────────────────────────────

                LOCATION
                Address: ${values.address}
                City: ${values.city}
                State/Region: ${values.state}
                Zip Code: ${values.zipCode || "Not provided"}
                Country: ${values.country}

                ────────────────────────────────────────

                MESSAGE:

                ${values.message}

                ────────────────────────────────────────

                Sent from TheVybeNews Advertising & Sponsorship Form
                `;

      await sendMail({
        email: "Vybe News <sponsor@thevybenews.com>",
        subject: `New Advertisement Form From Company: ${values.company} - Name: ${values.title} ${values.contactName}`,
        text: mailText,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      {isSubmittied ? (
        <div className="text-black flex flex-col items-center">
          <TiTick className="text-4xl bg-[#0DB342] rounded-full text-zinc-100 " />

          <h2 className="font-semibold">Thank you for reaching out!</h2>
          <p className="text-sm mt-2 text-zinc-800 text-center">
            Your advertising request has been received. Our media team will
            contact you shortly with next steps.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-zinc-800">
            <h2 className="font-semibold text-2xl">Advertise with Us</h2>
            <span className="text-sm text-zinc-600">
              Kindly complete the form below:
            </span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmut)}
              className="text-zinc-800 flex flex-col  gap-4"
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
                      <FormLabel className="tracking-wider">Industry</FormLabel>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border border-zinc-400">
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent className="border border-zinc-800">
                        <SelectGroup>
                          <SelectLabel>Title</SelectLabel>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Dr.">Dr.</SelectItem>
                          <SelectItem value="Prof.">Prof.</SelectItem>
                          <SelectItem value="Engr.">Engr.</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      Contact (Full name)
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
                    <FormLabel className="tracking-wider">Address</FormLabel>
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
                    <FormLabel className="tracking-wider">Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="border border-zinc-400"
                        {...field}
                        type="number"
                      />
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
                    <FormLabel className="tracking-wider">Country</FormLabel>
                    <FormControl>
                      <Input className="border border-zinc-400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      State/Region
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">City</FormLabel>
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
        </div>
      )}
    </div>
  );
};

export default ContactForm;
