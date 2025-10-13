"use client";

import { useSession } from "next-auth/react";
import AboutUser from "./AboutUser";
import SavedArticlesComponent from "./SavedArticlesComponent";
import SavedArticles from "./SavedArticles";

const ProfileAbout = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center flex-col">
      <AboutUser session={session!} />
      <SavedArticles userId={session?.user?.id as string} />
    </div>
  );
};

export default ProfileAbout;
