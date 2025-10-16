"use client";
import React from "react";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { useSearchParams } from "next/navigation";
import { useSports } from "@/hooks/useSports";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllSports = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: sports, isLoading } = useSports(page);

  const articles: Article[] = sports?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
        {articles?.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div className="mt-8">
        {sports?.pageNumber > 1 && (
          <PaginationComponent pageNumber={sports?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllSports;
