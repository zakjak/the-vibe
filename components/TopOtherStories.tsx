import { Article } from "@/lib/types/article";
import TopSmallCards from "./TopSmallCards";

const TopOtherStories = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {articles?.map((item) => (
        <TopSmallCards item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TopOtherStories;
