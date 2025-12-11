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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SocialMediaComponent from "./SocialMediaComponent";
import AboutUserSkeleton from "./AboutUserSkeleton";

const formSchema = z.object({
  profilePicture: z.union([
    z.custom<File>((file) => file instanceof File).nullable(),
    z.string(),
  ]),
});

const AboutUserProfile = ({ user }: { user: User }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isFetching } = useAbout(user?.id);

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

  if (isFetching) {
    return <AboutUserSkeleton />;
  }

  return (
    <div className="grid md:grid-cols-2 p-8 gap-2">
      <div className="relative w-full h-60 md:h-100">
        <div className="h-full w-full">
          {user?.image && (
            <Image
              alt=""
              src={imagePreview ? imagePreview : (user?.image as string)}
              className="rounded-md w-full h-full object-cover"
              width={240}
              height={240}
            />
          )}
        </div>
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

              {data && <SocialMediaComponent data={data} />}

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Read Full Bio</Button>
                </DialogTrigger>
                <DialogContent className="z-999">
                  <DialogHeader>
                    <DialogTitle>About User</DialogTitle>
                    <DialogDescription className="text-2xl dark:text-white text-zinc-800">
                      {user?.name}
                    </DialogDescription>
                    <SocialMediaComponent data={data[0]} />
                  </DialogHeader>
                  <DialogHeader className="text-start overflow-scroll h-[45vh] text-zinc-800 dark:text-white p-2">
                    <p>{lines.join("\n")}</p>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUserProfile;
