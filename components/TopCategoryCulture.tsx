import { Articles } from "@/lib/types/article";
import ListCulture from "./ListCulture";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryCulture = ({ articles }: Articles) => {
  const otherStories = articles?.slice(1, 6);
  return (
    <div>
      <h2 className="text-lg tracking-wider">Culture</h2>
      {articles && (
        <>
          <TopCategoryStory topStory={articles[0]} />
          <ListCulture articles={otherStories} />
        </>
      )}
    </div>
  );
};

export default TopCategoryCulture;
