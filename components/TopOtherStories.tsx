import { Article } from "@/lib/types/article";
import TopSmallCards from "./TopSmallCards";
import ListTopStories from "./ListTopStories";

const TopOtherStories = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="mt-2 flex flex-col gap-4">
      {articles?.length >= 1 && (
        <>
          <TopSmallCards article={articles[0]} />
          <ListTopStories articles={articles?.slice(1)} />
        </>
      )}
    </div>
  );
};

export default TopOtherStories;
