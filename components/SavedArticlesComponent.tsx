"use client";

import { useSavedArticles } from "@/hooks/useSavedArticles";
import React, { useEffect, useState } from "react";
import TopCategoryStory from "./TopCategoryStory";
import { useInView } from "react-intersection-observer";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";
import { useSession } from "next-auth/react";

const SavedArticlesComponent = () => {
  const { data: session } = useSession();
  const [visiblePageCount, setVisiblePageCount] = useState(2);
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSavedArticles(session?.user?.id as string);

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
          <TopCategoryStory key={articles?.id} topStory={articles} />
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
