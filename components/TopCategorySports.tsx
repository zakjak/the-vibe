import React from "react";
import TopCategoryStory from "./TopCategoryStory";
import ListSports from "./ListSports";
import { Article } from "@/lib/types/article";

const TopCategorySports = ({ articles }: { articles: Article[] }) => {
  const otherStories = articles?.slice(1, 6);
  return (
    <div>
      <h2 className="text-xl tracking-wider">Sports</h2>
      {articles && (
        <>
          <TopCategoryStory topStory={articles[0]} />
          <ListSports articles={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategorySports;
