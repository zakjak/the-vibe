import ListCulture from "./ListCulture";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryCulture = ({ culture }) => {
  const otherStories = culture?.slice(1, 6);
  return (
    <div>
      <h2 className="text-lg tracking-wider">Culture</h2>
      {culture && (
        <>
          <TopCategoryStory topStory={culture[0]} />
          <ListCulture otherStories={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryCulture;
