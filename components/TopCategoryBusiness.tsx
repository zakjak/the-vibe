import { Articles } from "@/lib/types/article";
import ListBusiness from "./ListBusiness";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryBusiness = ({ articles }: Articles) => {
  const otherStories = articles?.slice(1, 6);
  return (
    <div>
      {articles && (
        <>
          <h2 className="text-lg tracking-wider">Business</h2>
          <TopCategoryStory topStory={articles[0]} />
          <ListBusiness articles={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryBusiness;
