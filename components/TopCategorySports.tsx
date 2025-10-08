import React from "react";
import TopCategoryStory from "./TopCategoryStory";
import ListSports from "./ListSports";

const TopCategorySports = ({ sports }) => {
  const otherStories = sports?.slice(1, 6);
  return (
    <div>
      <h2>Technology</h2>
      {sports && (
        <>
          <TopCategoryStory topStory={sports[0]} />
          <ListSports otherStories={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategorySports;
