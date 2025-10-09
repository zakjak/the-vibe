"use client";

import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import { useTechnology } from "@/hooks/useTechnology";
import { useSearchParams } from "next/navigation";

const AllTechnology = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: technology } = useTechnology(page);

  return (
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
        {technology &&
          technology?.response.map((story) => (
            <TopCategoryStory key={story.id} topStory={story} />
          ))}
      </div>
      <div>
        <PaginationComponent pageNumber={technology?.pageNumber} />
      </div>
    </div>
  );
};

export default AllTechnology;
