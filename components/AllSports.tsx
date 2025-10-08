"use client";
import React from "react";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { useSearchParams } from "next/navigation";
import { useSports } from "@/hooks/useSports";

const AllSports = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: sports } = useSports(page);

  return (
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto h-[100vh]">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
        {sports?.response.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div>
        <PaginationComponent pageNumber={sports?.pageNumber} />
      </div>
    </div>
  );
};

export default AllSports;
