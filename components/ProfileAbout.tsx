"use client";

import { useSession } from "next-auth/react";
import SavedArticles from "./SavedArticles";
import { User } from "@/lib/types/users";
import AboutUserProfile from "./AboutUserProfile";

const ProfileAbout = () => {
  const { data: session } = useSession();

  return (
    <div className="lg:w-240 w-[90%] mx-auto">
      <AboutUserProfile user={session?.user as User} />
      <SavedArticles user={session?.user as User} />
    </div>
  );
};

export default ProfileAbout;
