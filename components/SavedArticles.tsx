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
        {user?.isAdmin && (
          <div className="">
            <ArticleForm user={user} setError={setError} />
          </div>
        )}
      </div>
      <div className="">
        <h1 className="text-3xl font-bold tracking-wide my-4"></h1>
        <CreatedArticles ownerId={user?.id as string} />
      </div>
    </div>
  );
};

export default SavedArticles;
