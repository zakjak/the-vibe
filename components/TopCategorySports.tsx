import React from "react";
import TopCategoryStory from "./TopCategoryStory";
import ListSports from "./ListSports";
import { Articles } from "@/lib/types/article";

const TopCategorySports = ({ articles }: Articles) => {
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
