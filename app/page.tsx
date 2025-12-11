import TopMainStories from "@/components/TopMainStories";
import TopStories from "@/components/TopStories";

const Home = () => {
  return (
    <div className="lg:max-w-7xl md:max-w-200 mx-auto p-4 w-[85%] md:w-full">
      <TopMainStories />
      <TopStories />
    </div>
  );
};

export default Home;
