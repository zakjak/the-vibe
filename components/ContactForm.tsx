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

const formSchema = z.object({
  company: z
    .string()
    .min(1, { message: "Company/Organization cannot be empty" }),
  website: z.string(),
  industry: z.string(),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  message: z.string().min(1, { message: "Message cannot be empty" }),
  email: z.email().min(1, { message: "Company/Organization cannot be empty" }),
  address: z.string(),
  phone: z.string(),
  country: z.string(),
  state: z.string().min(1, { message: "State/Region cannot be empty" }),
  city: z.string(),
  zipCode: z.string(),
});
const ContactForm = () => {
  const [isSubmittied, setIsSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const { mutate } = useAddMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      website: "",
      industry: "",
      name: "",
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
                Industry: ${values.industry || "Not provided"}

                ────────────────────────────────────────

                CONTACT PERSON
                Name: ${values.name}
                Email: ${values.email}
                Phone: ${values.phone || "Not provided"}

                ────────────────────────────────────────

                LOCATION
                Address: ${values.address || "Not provided"}
                City: ${values.city || "Not provided"}
                State/Region: ${values.state || "Not provided"}
                Zip Code: ${values.zipCode || "Not provided"}
                Country: ${values.country || "Not provided"}

                ────────────────────────────────────────

                MESSAGE:

                ${values.message}

                ────────────────────────────────────────

                Sent from TheVybeNews Advertising & Sponsorship Form
                `;

      await sendMail({
        email: "Vybe News <sponsor@thevybenews.com>",
        subject: `New Advertisement Form From Company: ${values.company} - Name: ${values.name}`,
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
              Kindly complete the form provided and a member of our sales team
              will be in touch with you shortly.
            </span>
          </div>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      Contact Name (Full name)
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
                    <FormLabel className="tracking-wider">
                      Phone (optional)
                    </FormLabel>
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
                    <FormLabel className="tracking-wider">
                      City (optional)
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
