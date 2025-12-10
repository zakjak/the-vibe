import TopMainStories from "@/components/TopMainStories";
import TopStories from "@/components/TopStories";

const Home = () => {
  return (
    <div className="lg:max-w-280 md:max-w-200 mx-auto p-4">
      <TopMainStories />
      <TopStories />
    </div>
  );
};

export default Home;
