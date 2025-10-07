"use client";

import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import { useTechnology } from "@/hooks/useTechnology";

const AllTechnology = () => {
  const { data: technology } = useTechnology();
  console.log(technology);

  return (
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto h-[100vh]">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
        {technology &&
          technology.map((story) => (
            <TopCategoryStory key={story.id} topStory={story} />
          ))}
      </div>
      <div>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default AllTechnology;
