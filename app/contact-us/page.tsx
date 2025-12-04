import ContactForm from "@/components/ContactForm";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMegaphoneOutline } from "react-icons/io5";

import { MdEmail } from "react-icons/md";

const ContatPage = () => {
  const contacts = [
    {
      label: "General Enquiries",
      description:
        "For questions, feedback or general communication with our newsroom.",
      email: "contact@thevybenews.com",
      icon: <MdEmail />,
    },
    {
      label: "Sponsorship & advertisement",
      description:
        "For brand partnership, promotion and advertising-related requests.",
      email: "sponsor@thevybenews.com",
      icon: <IoMegaphoneOutline />,
    },
    {
      label: "Editorial Desk",
      description: "For editorial matters, submissions and story tips.",
      email: "editor@thevybenews.com",
      icon: <FaRegNewspaper />,
    },
  ];

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto">
        <div className="h-[13rem] lg:h-[20rem] shadow-xl md:h-[15rem] bg-linear-to-bl from-[#DBDCF3] to-blue-500  my-6 rounded-2xl flex items-center justify-center">
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-black font-semibold">
            Lets Work Together
          </h1>
        </div>

        <div className="w-full bg-zinc-100 rounded-lg p-10 shadow-2xl">
          <div className="text-zinc-800 mb-8">
            <Image src="/favicon.svg" alt="" width={150} height={100} />
            <div className="mt-8">
              <h2 className="font-semibold text-2xl">Advertise with Us</h2>
              <span className="text-sm text-zinc-600">
                Kindly complete the form provided and a member of our sales team
                will be in touch with you shortly.
              </span>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="my-8">
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-center font-semibold">
            Prefer direct communication? Reach us through the following:
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 w-[80%] mx-auto md:w-full mt-8">
            {contacts.map((contact) => (
              <Card
                key={contact.email}
                className="bg-[#F8F8F8] p-4 shadow-xl rounded-lg text-black"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-[#EAE8F4] text-[#6F65C7] text-2xl p-3 rounded-2xl">
                    {contact.icon}
                  </div>

                  <CardTitle>{contact.label}</CardTitle>
                  <CardDescription>{contact.description}</CardDescription>
                </div>
                <CardFooter className="mt-2">
                  <Link
                    className="hover:underline flex items-center gap-2"
                    href={`mailto:${contact.email}`}
                  >
                    <MdEmail />
                    {contact.email}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatPage;
