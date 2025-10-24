"use client";

import { useSession } from "next-auth/react";
import AboutUser from "./AboutUser";
import SavedArticles from "./SavedArticles";
import { User } from "@/lib/types/users";
import { useState } from "react";

const ProfileAbout = () => {
  const { data: session } = useSession();
  const [error, setError] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col">
      <AboutUser user={session?.user as User} />
      <SavedArticles user={session?.user as User} setError={setError} />
    </div>
  );
};

export default ProfileAbout;
