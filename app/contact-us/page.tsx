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
      description: "For questions, feedback or general information.",
      email: "contact@thevybenews.com",
      icon: <MdEmail />,
    },
    {
      label: "Sponsorship & Advertisement",
      description: "For partnerships, promotions and advertisements.",
      email: "sponsor@thevybenews.com",
      icon: <IoMegaphoneOutline />,
    },
    {
      label: "Editorial Desk",
      description: "For editorials, submissions and story tips.",
      email: "editor@thevybenews.com",
      icon: <FaRegNewspaper />,
    },
  ];

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto">
        <div className="h-[13rem] lg:h-[20rem] shadow-xl md:h-[15rem] bg-linear-to-bl from-[#DBDCF3] to-blue-500  my-6 rounded-2xl flex items-center justify-center">
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-black font-semibold">
            {`Let's Work Together`}
          </h1>
        </div>

        <div className="w-full bg-zinc-100 dark:shadow-gray-800 rounded-lg p-10 shadow-2xl">
          <div className=" mb-8">
            <Image src="/favicon.svg" alt="" width={150} height={100} />
          </div>

          <ContactForm />
        </div>

        <div className="my-8">
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-center font-semibold">
            Do you prefer Direct communication? Reach us at:
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 w-[80%] mx-auto md:w-full mt-8">
            {contacts.map((contact) => (
              <Card
                key={contact.email}
                className="bg-[#F8F8F8] p-4 shadow-lg dark:shadow-gray-700 rounded-lg text-black"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-[#EAE8F4] text-[#6F65C7] text-2xl p-3 rounded-2xl">
                    {contact.icon}
                  </div>

                  <CardTitle>{contact.label}</CardTitle>
                  <CardDescription className="text-zinc-600">
                    {contact.description}
                  </CardDescription>
                </div>
                <CardFooter className="mt-2">
                  <Link
                    className="hover:underline flex items-center gap-2"
                    href={`mailto:${contact.email}`}
                  >
                    <MdEmail className="text-[#6F65C7]" />
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
