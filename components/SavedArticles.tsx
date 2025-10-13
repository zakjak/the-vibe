"use client";

import SavedArticlesComponent from "./SavedArticlesComponent";

const SavedArticles = ({ userId }: { userId: string }) => {
  return (
    <div className="m-6">
      <h1>Saved Articles</h1>
      <SavedArticlesComponent userId={userId as string} />
    </div>
  );
};

export default SavedArticles;
