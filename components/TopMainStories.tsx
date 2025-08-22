import LatestStoryBanner from "./LatestStoryBanner";
import TopOtherStories from "./TopOtherStories";

const TopMainStories = () => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-8">
      <div className="lg:col-span-4 md:col-span-2">
        <LatestStoryBanner />
      </div>
      <div className="lg:col-span-2 md:col-span-2">
        <TopOtherStories />
      </div>
    </div>
  );
};

export default TopMainStories;
