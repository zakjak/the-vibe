import TopSmallCards from "./TopSmallCards";

interface Articles {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  story: string;
}

const TopOtherStories = async () => {
  const data = await fetch("http://localhost:3000/api/articles");
  const articles: Articles[] = await data.json();
  return (
    <div className="mt-6 flex flex-col gap-4">
      {articles.slice(1, 4).map((item) => (
        <TopSmallCards item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TopOtherStories;
