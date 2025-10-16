import { useSavedArticles } from "@/hooks/useSavedArticles";
import { Article } from "@/lib/types/article";
import React, { useEffect } from "react";
import TopCategoryStory from "./TopCategoryStory";
import { useInView } from "react-intersection-observer";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const SavedArticlesComponent = ({ userId }: { userId: string }) => {
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSavedArticles(userId);

  const { userSavedArticles: savedArticles } = data?.pages[0] ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div>
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4"
      >
        {savedArticles?.map(({ articles }: { articles: Article }) => (
          <TopCategoryStory key={articles.id} topStory={articles} />
        ))}
      </div>
      <div
        ref={ref}
        className="bg-red flex justify-center my-4 font-bold text-2xl"
      >
        {isFetchingNextPage ? (
          <CategoriesPageSkeleton />
        ) : hasNextPage ? (
          "Scroll to load more"
        ) : (
          "No more articles"
        )}
      </div>
    </div>
  );
};

export default SavedArticlesComponent;
