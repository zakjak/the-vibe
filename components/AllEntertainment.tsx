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
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
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
