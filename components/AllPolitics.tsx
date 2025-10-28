"use client";

import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import { usePolitics } from "@/hooks/usePolitics";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllPolitics = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: politics, isLoading } = usePolitics(pageNumber);

  const articles: Article[] = politics?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-ful pt-6">
      {politics && (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-[60rem] md:w-[40rem] w-[70%] mx-auto">
            {articles?.map((story) => (
              <TopCategoryStory key={story?.id} topStory={story} />
            ))}
          </div>
          <div className="mt-8">
            {politics?.pageNumber > 1 && (
              <PaginationComponent pageNumber={politics?.pageNumber} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllPolitics;
