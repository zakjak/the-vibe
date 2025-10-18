"use client";

import { User } from "@/lib/types/users";
import SavedArticlesComponent from "./SavedArticlesComponent";
import ArticleForm from "./ArticleForm";
import { Button } from "./ui/button";
import { useState } from "react";
import CreatedArticles from "./CreatedArticles";

const SavedArticles = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<"created" | "saved">("saved");

  return (
    <div className="m-6">
      <div className="mt-2 gap-2 flex">
        {user?.isAdmin && (
          <div className="flex gap-2 w-full justify-between">
            <div className="flex gap-2">
              <Button
                variant={`${activeTab === "saved" ? "default" : "outline"}`}
                onClick={() => setActiveTab("saved")}
              >
                Saved Articles
              </Button>
              <Button
                variant={`${activeTab === "created" ? "default" : "outline"}`}
                onClick={() => setActiveTab("created")}
              >
                Created Articles
              </Button>
            </div>

            <ArticleForm user={user} />
          </div>
        )}
      </div>
      <div className="">
        <h1 className="text-3xl font-bold tracking-wide my-4">
          {activeTab === "saved" ? "Saved Articles" : "Created Articles"}
        </h1>
        {activeTab === "saved" ? (
          <SavedArticlesComponent userId={user?.id as string} />
        ) : (
          <CreatedArticles ownerId={user?.id as string} />
        )}
      </div>
    </div>
  );
};

export default SavedArticles;
