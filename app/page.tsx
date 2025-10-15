import TopMainStories from "@/components/TopMainStories";
import TopStories from "@/components/TopStories";

const Home = () => {
  return (
    <div className="lg:max-w-[70rem] md:max-w-[50rem] mx-auto p-4">
      <TopMainStories />
      <TopStories />
    </div>
  );
};

export default Home;
