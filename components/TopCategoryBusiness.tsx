import ListBusiness from "./ListBusiness";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryBusiness = ({ business }) => {
  const otherStories = business.slice(1, 6);
  return (
    <div>
      <h2>Business</h2>
      <TopCategoryStory topStory={business[0]} />
      <ListBusiness otherStories={otherStories} />
    </div>
  );
};

export default TopCategoryBusiness;
