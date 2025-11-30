"use client";
import { useDraft } from "@/hooks/useCreatedArticles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TopCategoryStory from "./TopCategoryStory";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const DraftArticles = () => {
  const [visiblePageCount, setVisiblePageCount] = useState(2);
  const { ref, inView } = useInView({ threshold: 0 });

  const { data: session } = useSession();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useDraft(
    session?.user?.id as string
  );

  const visiblePages = data?.pages.slice(-visiblePageCount);
  const createdArticles = visiblePages?.flat();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setVisiblePageCount((prev) => prev + 1);
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="w-[90%] mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-6 md:gap-4">
        {createdArticles?.map((article) => (
          <TopCategoryStory key={article?.id} topStory={article} />
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

export default DraftArticles;
