"use client";

import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import { useBusiness } from "@/hooks/useBusiness";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllBusiness = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: business, isLoading } = useBusiness(pageNumber);

  const articles: Article[] = business?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-[60rem] md:w-[40rem] w-[70%] mx-auto">
        {articles?.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div className="mt-8">
        {business?.pageNumber > 1 && (
          <PaginationComponent pageNumber={business?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllBusiness;
