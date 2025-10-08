import ListTechnology from "./ListTechnology";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryTechnology = ({ technology }) => {
  const otherStories = technology?.slice(1, 6);
  return (
    <div>
      <h2 className="text-lg tracking-wider">Technology</h2>
      {technology && (
        <>
          <TopCategoryStory topStory={technology[0]} />
          <ListTechnology otherStories={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryTechnology;
