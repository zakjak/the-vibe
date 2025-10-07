import ListEntertainment from "./ListEntertainment";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryEntertainment = ({ entertainment }) => {
  const otherStories = entertainment?.slice(1, 6);

  return (
    <div>
      {entertainment && (
        <>
          <h2>Entertainment</h2>
          <TopCategoryStory topStory={entertainment[0]} />
          <ListEntertainment otherStories={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryEntertainment;
