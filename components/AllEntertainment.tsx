"use client";

import { useEntertainment } from "@/hooks/useEntertainment";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllEntertainment = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: entertainment, isLoading } = useEntertainment(pageNumber);

  const articles: Article[] = entertainment?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-240 md:w-160 w-[70%] mx-auto">
        {articles?.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div className="mt-8">
        {entertainment?.pageNumber > 1 && (
          <PaginationComponent pageNumber={entertainment?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllEntertainment;
