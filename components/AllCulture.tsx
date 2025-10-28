"use client";

import { useCulture } from "@/hooks/useCulture";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllCulture = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: culture, isLoading } = useCulture(pageNumber);

  const articles: Article[] = culture?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-[60rem] md:w-[40rem] w-[70%] mx-auto">
        {articles?.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div className="mt-8">
        {culture?.pageNumber > 1 && (
          <PaginationComponent pageNumber={culture?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllCulture;
