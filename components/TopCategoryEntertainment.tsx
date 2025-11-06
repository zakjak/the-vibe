import { Article } from "@/lib/types/article";
import ListEntertainment from "./ListEntertainment";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryEntertainment = ({ articles }: { articles: Article[] }) => {
  const otherStories = articles?.slice(1, 6);

  return (
    <div>
      {articles && (
        <>
          <h2 className="text-xl tracking-wider">Entertainment</h2>
          <TopCategoryStory topStory={articles[0]} />
          <ListEntertainment articles={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryEntertainment;
