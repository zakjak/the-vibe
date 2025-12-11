"use client";

import React from "react";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { useSports } from "@/hooks/useSports";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllSports = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: sports, isLoading } = useSports(pageNumber);

  const articles: Article[] = sports?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-ful pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-240 md:w-160 w-[70%] mx-auto">
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
