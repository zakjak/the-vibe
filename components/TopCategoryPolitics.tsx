import ListPolitics from "./ListPolitics";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryPolitics = ({ politics }) => {
  const otherStories = politics?.slice(1, 6);

  return (
    <div>
      {politics && (
        <div className="w-full">
          <h2 className="text-xl tracking-wider">Politics</h2>
          <TopCategoryStory topStory={politics[0]} />
          <ListPolitics otherStories={otherStories} />
        </div>
      )}
    </div>
  );
};

export default TopCategoryPolitics;
