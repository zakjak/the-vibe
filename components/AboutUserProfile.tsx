import { useRef } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Input } from "./ui/input";
import { User } from "@/lib/types/users";
import Image from "next/image";
import AboutUserProfileInformation from "./AboutUserProfileInformation";
import { useAbout } from "@/hooks/useUsers";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";

const formSchema = z.object({
  profilePicture: z.union([
    z.custom<File>((file) => file instanceof File).nullable(),
    z.string(),
  ]),
});

const AboutUserProfile = ({ user }: { user: User }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data } = useAbout(user?.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePicture: undefined,
    },
  });

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();

    if (file) {
      form.setValue("profilePicture", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));

      formData.append("profilePicture", file);

      const responseUpload = await fetch(`/api/user/profile-image`, {
        method: "POST",
        body: formData,
      });

      if (responseUpload) {
        const imageUpload = await responseUpload.json();

        const imageUrl = imageUpload?.result?.variants[0];

        const image = {
          profileImage: imageUrl,
        };

        const responseProfile = await fetch(`/api/user/${user?.id}`, {
          method: "POST",
          body: JSON.stringify(image),
        });

        if (responseProfile.ok) {
          await responseProfile.json();
        }
      }
    }
  };

  const lines = data && data[0]?.bio?.split(/\r?\n/).filter(Boolean);

  return (
    <>
      <div className="grid md:grid-cols-2 p-8 gap-2">
        <div className="w-full h-[25rem]">
          <div className="relative  w-full h-full flex items-center justify-center">
            {user?.image && (
              <Image
                alt=""
                src={imagePreview ? imagePreview : (user?.image as string)}
                className="object-cover w-full h-full rounded-md "
                width={240}
                height={240}
              />
            )}
            <div className="absolute bottom-2 right-2 cursor-pointer bg-black p-2 rounded-full hover:opacity-90">
              <HiOutlinePencilAlt
                onClick={handleIconClick}
                size={25}
                className="text-white"
              />
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">
            <div className="flex justify-between">
              <h1 className="font-semibold tracking-wider mt-2 text-2xl">
                {user?.name}
              </h1>
              <AboutUserProfileInformation userId={user?.id} />
            </div>
            {data && data[0] && (
              <div className="">
                <h3 className="lg:text-xl text-lg">{data[0]?.postion}</h3>

                <div className="flex items-center gap-2 my-3">
                  <h3>Follow:</h3>
                  {data[0]?.fb && (
                    <Link href={data[0]?.fb}>
                      <FaFacebookF />
                    </Link>
                  )}

                  {data[0]?.twitter && (
                    <Link href={data[0]?.twitter}>
                      <FaXTwitter />
                    </Link>
                  )}

                  {data[0]?.linkedIn && (
                    <Link href={data[0]?.linkedIn}>
                      <FaLinkedinIn />
                    </Link>
                  )}
                </div>

                <p className="text-justify">
                  {isExpanded ? lines.join("\n") : lines[0]}
                </p>

                {lines?.length > 1 && (
                  <Button
                    className="my-4"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Show less" : "Read Full Bio"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUserProfile;
