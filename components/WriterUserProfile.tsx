import { SocialProps, User, UserInfo } from "@/lib/types/users";
import React from "react";
import Image from "next/image";
import SocialMediaComponent from "./SocialMediaComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import AboutUserProfileInformation from "./AboutUserProfileInformation";

const WriterUserProfile = ({
  userInfo,
  writerBio,
}: {
  userInfo: User[];
  writerBio: UserInfo[];
}) => {
  const lines = writerBio && writerBio[0]?.bio?.split(/\r?\n/).filter(Boolean);
  return (
    <>
      <div className="grid md:grid-cols-2 p-8 gap-2">
        <div className="w-full h-[25rem]">
          <div className="relative  w-full h-full flex items-center justify-center">
            {userInfo[0]?.image && (
              <Image
                alt=""
                src={userInfo[0]?.image as string}
                className="object-cover w-full h-full rounded-md "
                width={240}
                height={240}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">
            <div className="flex justify-between">
              <h1 className="font-semibold tracking-wider mt-2 text-2xl">
                {userInfo[0]?.name}
              </h1>
            </div>
            {writerBio && userInfo && (
              <div className="">
                <h3 className="lg:text-xl text-lg">
                  {writerBio[0]?.bio?.split("\n")[0]}
                </h3>

                <SocialMediaComponent data={writerBio[0] as SocialProps} />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Read Full Bio</Button>
                  </DialogTrigger>
                  <DialogContent className="z-[999]">
                    <DialogHeader>
                      <DialogTitle>About User</DialogTitle>
                      <DialogDescription className="text-2xl dark:text-white text-zinc-800">
                        {userInfo[0]?.name}
                      </DialogDescription>
                      <SocialMediaComponent
                        data={writerBio[0] as SocialProps}
                      />
                    </DialogHeader>
                    <DialogHeader className="text-start overflow-scroll h-[45vh] text-zinc-800 dark:text-white p-[8px]">
                      <p>{lines.join("\n")}</p>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WriterUserProfile;
