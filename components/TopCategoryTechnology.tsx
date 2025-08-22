import ListTechnology from "./ListTechnology";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryTechnology = ({ technology }) => {
  const otherStories = technology.slice(1, 6);
  return (
    <div>
      <h2>Technology</h2>
      <TopCategoryStory topStory={technology[0]} />
      <ListTechnology otherStories={otherStories} />
    </div>
  );
};

export default TopCategoryTechnology;
