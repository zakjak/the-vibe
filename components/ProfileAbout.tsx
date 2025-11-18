"use client";

import { useSession } from "next-auth/react";
import SavedArticles from "./SavedArticles";
import { User } from "@/lib/types/users";
import { useState } from "react";
import AboutUserProfile from "./AboutUserProfile";

const ProfileAbout = () => {
  const { data: session } = useSession();
  const [error, setError] = useState(false);

  return (
    <div className="lg:w-[60rem] mx-auto">
      <AboutUserProfile user={session?.user as User} />
      <SavedArticles user={session?.user as User} setError={setError} />
    </div>
  );
};

export default ProfileAbout;
