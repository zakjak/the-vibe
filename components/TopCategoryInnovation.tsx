import React from "react";
import TopCategoryStory from "./TopCategoryStory";
import ListInnovation from "./ListInnovation";

const TopCategoryInnovation = ({ sports }) => {
  const otherStories = sports?.slice(1, 6);
  return (
    <div>
      <h2>Sports</h2>
      <TopCategoryStory topStory={sports[0]} />
      <ListInnovation otherStories={otherStories} />
    </div>
  );
};

export default TopCategoryInnovation;
