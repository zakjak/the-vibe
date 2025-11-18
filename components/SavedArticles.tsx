"use client";

import { User } from "@/lib/types/users";
import ArticleForm from "./ArticleForm";
import { Dispatch, SetStateAction } from "react";
import CreatedArticles from "./CreatedArticles";

const SavedArticles = ({
  user,
  setError,
}: {
  user: User;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="m-6">
      <div className="mt-2 gap-2 flex w-full">
        {user?.isAdmin && <ArticleForm user={user} setError={setError} />}
      </div>
      <div className="md:w-[90%] w-[80%] mx-auto">
        <div className="flex items-center gap-2">
          <div className="dark:bg-white bg-black w-1.5 h-5" />
          <h1 className="lg:text-3xl text-2xl font-bold tracking-wide my-4">
            Latest
          </h1>
        </div>
        <CreatedArticles ownerId={user?.id as string} />
      </div>
    </div>
  );
};

export default SavedArticles;
