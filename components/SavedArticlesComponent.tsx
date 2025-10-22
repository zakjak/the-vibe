import { useSavedArticles } from "@/hooks/useSavedArticles";
import { Article } from "@/lib/types/article";
import React, { useEffect, useState } from "react";
import TopCategoryStory from "./TopCategoryStory";
import { useInView } from "react-intersection-observer";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const SavedArticlesComponent = ({
  userId,
  activeTab,
}: {
  userId: string;
  activeTab: string;
}) => {
  const [visiblePageCount, setVisiblePageCount] = useState(2);
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSavedArticles(userId);

  const visiblePages = data?.pages?.slice(-visiblePageCount);
  const savedArticles = visiblePages?.flat();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setVisiblePageCount((prev) => prev + 1);
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div>
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4"
      >
        {savedArticles?.map(({ articles }) => (
          <TopCategoryStory
            key={articles?.id}
            topStory={articles}
            activeTab={activeTab}
          />
        ))}
      </div>
      <div
        ref={ref}
        className="bg-red flex justify-center my-4 font-bold text-2xl"
      >
        {isFetchingNextPage ? (
          <CategoriesPageSkeleton />
        ) : hasNextPage ? (
          <CategoriesPageSkeleton />
        ) : (
          <div className="text-center mt-4">
            <p>No more articles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArticlesComponent;
