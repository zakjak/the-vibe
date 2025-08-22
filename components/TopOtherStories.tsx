import data from "@/data.json";
import TopSmallCards from "./TopSmallCards";

const TopOtherStories = () => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {data.slice(1, 4).map((item) => (
        <TopSmallCards item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TopOtherStories;
