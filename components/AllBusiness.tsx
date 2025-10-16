"use client";

import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import { useBusiness } from "@/hooks/useBusiness";
import { useSearchParams } from "next/navigation";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllBusiness = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: business, isLoading } = useBusiness(page);

  const articles: Article[] = business?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
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
