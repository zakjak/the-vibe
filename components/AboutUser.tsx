import { useRef } from "react";
import { nameFallback } from "@/lib/utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import ArticleForm from "./ArticleForm";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Input } from "./ui/input";
import { Session } from "@/lib/types/users";

const formSchema = z.object({
  profilePicture: z.union([
    z.custom<File>((file) => file instanceof File).nullable(),
    z.string(),
  ]),
});

const AboutUser = ({ session }: { session: Session }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

      const responseUpload = await fetch(
        "http://localhost:3000/api/user/profile-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (responseUpload) {
        const imageUpload = await responseUpload.json();

        const imageUrl = imageUpload?.result?.variants[0];

        const image = {
          profileImage: imageUrl,
        };

        const responseProfile = await fetch(
          `http://localhost:3000/api/user/${session?.userId}`,
          {
            method: "POST",
            body: JSON.stringify(image),
          }
        );

        if (responseProfile.ok) {
          const response = await responseProfile.json();
        }
      }
    }
  };

  const removeImagePreview = () => {
    form.setValue("profilePicture", null);
    setImagePreview(null);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="relative">
          <Avatar className="w-[8rem] h-[8rem]  flex items-center justify-center">
            <AvatarImage
              src={
                imagePreview
                  ? imagePreview
                  : (session?.user?.profilePicture as string)
              }
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback className="font-bold">
              {session && <p>{nameFallback(session?.user?.name)}</p>}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-2 cursor-pointer bg-black p-2 rounded-full hover:opacity-90">
            <HiOutlinePencilAlt onClick={handleIconClick} size={25} />
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        <h1 className="font-semibold tracking-wider mt-2">
          {session?.user?.name}
        </h1>
      </div>
      <div className="mt-2 gap-2 flex">
        <Button variant="outline">Saved Articles</Button>
        {session?.user?.isAdmin && <ArticleForm userInfo={session} />}
      </div>
    </>
  );
};

export default AboutUser;
