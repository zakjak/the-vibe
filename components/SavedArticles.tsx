"use client";

import SavedArticlesComponent from "./SavedArticlesComponent";

const SavedArticles = ({ userId }: { userId: string }) => {
  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold tracking-wide">Saved Articles</h1>
      <SavedArticlesComponent userId={userId as string} />
    </div>
  );
};

export default SavedArticles;
