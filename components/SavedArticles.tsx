"use client";

import { User } from "@/lib/types/users";
import CreatedArticles from "./CreatedArticles";

const SavedArticles = ({ user }: { user: User }) => {
  return (
    <div className="m-6">
      <div className="">
        <div className="flex items-center gap-2">
          <div className="dark:bg-white bg-black w-1.5 h-5" />
          <h1 className="lg:text-3xl text-2xl font-bold tracking-wide my-4">
            Latest
          </h1>
        </div>
        {user && <CreatedArticles ownerId={user?.id as string} />}
      </div>
    </div>
  );
};

export default SavedArticles;
