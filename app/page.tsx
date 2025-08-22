import TopMainStories from "@/components/TopMainStories";
import TopStories from "@/components/TopStories";

const Home = () => {
  return (
    <div className="mt-6 mb-8 lg:w-[70rem] md:w-[50rem] w-[30rem] mx-auto px-10">
      <TopMainStories />
      <TopStories />
    </div>
  );
};

export default Home;
