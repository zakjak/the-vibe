import { useCreatedArticles } from "@/hooks/useCreatedArticles";
import TopCategoryStory from "./TopCategoryStory";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const CreatedArticles = ({ ownerId }: { ownerId: string }) => {
  const [visiblePageCount, setVisiblePageCount] = useState(2);

  const { ref, inView } = useInView({ threshold: 0 });
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCreatedArticles(ownerId);

  const visiblePages = data?.pages.slice(-visiblePageCount);
  const createdArticles = visiblePages?.flat();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setVisiblePageCount((prev) => prev + 1);
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
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

export default CreatedArticles;
