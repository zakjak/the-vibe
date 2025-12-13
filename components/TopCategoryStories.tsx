import { Article } from "@/lib/types/article";
import TopCategoryStory from "./TopCategoryStory";
import ListStory from "./ListStory";

const TopCategoryStories = ({ articles }: { articles: Article[] }) => {
  const otherStories = articles?.slice(1, 6);

  return (
    <div>
      {articles && (
        <div className="w-full">
          <h2 className="text-xl tracking-wider">{articles[0]?.category}</h2>
          <TopCategoryStory topStory={articles[0]} />
          <ListStory articles={otherStories} />
        </div>
      )}
    </div>
  );
};

export default TopCategoryStories;
