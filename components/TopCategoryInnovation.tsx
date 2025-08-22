import React from "react";
import TopCategoryStory from "./TopCategoryStory";
import ListInnovation from "./ListInnovation";

const TopCategoryInnovation = ({ innovation }) => {
  const otherStories = innovation.slice(1, 6);
  return (
    <div>
      <h2>Innovation</h2>
      <TopCategoryStory topStory={innovation[0]} />
      <ListInnovation otherStories={otherStories} />
    </div>
  );
};

export default TopCategoryInnovation;
