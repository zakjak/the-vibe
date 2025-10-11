import { Articles } from "@/lib/types/article";
import ListPolitics from "./ListPolitics";
import TopCategoryStory from "./TopCategoryStory";

const TopCategoryPolitics = ({ articles }: Articles) => {
  const otherStories = articles?.slice(1, 6);

  return (
    <div>
      {articles && (
        <div className="w-full">
          <h2 className="text-xl tracking-wider">Politics</h2>
          <TopCategoryStory topStory={articles[0]} />
          <ListPolitics articles={otherStories} />
        </div>
      )}
    </div>
  );
};

export default TopCategoryPolitics;
