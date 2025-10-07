import TopSmallCards from "./TopSmallCards";

interface Articles {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  story: string;
}

const TopOtherStories = ({ articles }: { articles: Articles[] }) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {articles?.map((item) => (
        <TopSmallCards item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TopOtherStories;
