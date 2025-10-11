import { Articles } from "@/lib/types/article";
import ListTechnology from "./ListTechnology";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryTechnology = ({ articles }: Articles) => {
  const otherStories = articles?.slice(1, 6);
  return (
    <div>
      <h2 className="text-lg tracking-wider">Technology</h2>
      {articles && (
        <>
          <TopCategoryStory topStory={articles[0]} />
          <ListTechnology articles={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryTechnology;
