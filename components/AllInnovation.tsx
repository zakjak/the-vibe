"use client";
import { useInnovation } from "@/hooks/useInnovation";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { Article } from "@/lib/types/article";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllInnovation = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: innovation, isLoading } = useInnovation(pageNumber);

  const articles: Article[] = innovation?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-[60rem] md:w-[40rem] w-[70%] mx-auto">
        {articles?.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div className="my-8">
        {innovation?.pageNumber > 1 && (
          <PaginationComponent pageNumber={innovation?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllInnovation;
