import ListPolitics from "./ListPolitics";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryPolitics = ({ politics }) => {
  const otherStories = politics?.slice(1, 6);

  return (
    <div>
      {politics && (
        <>
          <h2>Politics</h2>
          <TopCategoryStory topStory={politics[0]} />
          <ListPolitics otherStories={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryPolitics;
