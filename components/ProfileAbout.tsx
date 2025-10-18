"use client";

import { useSession } from "next-auth/react";
import AboutUser from "./AboutUser";
import SavedArticles from "./SavedArticles";
import { User } from "@/lib/types/users";

const ProfileAbout = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center flex-col">
      <AboutUser session={session} />
      <SavedArticles user={session?.user as User} />
    </div>
  );
};

export default ProfileAbout;
