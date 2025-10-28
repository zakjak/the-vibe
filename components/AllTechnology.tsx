"use client";

import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import { useTechnology } from "@/hooks/useTechnology";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllTechnology = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: technology, isLoading } = useTechnology(pageNumber);

  const articles: Article[] = technology?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-[60rem] md:w-[40rem] w-[70%] mx-auto">
        {technology &&
          articles.map((story) => (
            <TopCategoryStory key={story.id} topStory={story} />
          ))}
      </div>
      <div className="mt-8">
        {technology?.pageNumber > 1 && (
          <PaginationComponent pageNumber={technology?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllTechnology;
