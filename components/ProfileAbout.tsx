"use client";

import { useSession } from "next-auth/react";
import AboutUser from "./AboutUser";

const ProfileAbout = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-[15rem] flex justify-center items-center flex-col">
      <AboutUser session={session!} />
    </div>
  );
};

export default ProfileAbout;
