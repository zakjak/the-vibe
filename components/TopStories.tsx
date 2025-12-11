"use client";

import { useLatestStories } from "@/hooks/useLatestStories";
import TopStoriesSkeleton from "./TopStoriesSkeleton";
import TopCategoryStories from "./TopCategoryStories";

const TopStories = () => {
  const { data: articles, isLoading } = useLatestStories();

  const isVisible =
    articles?.topPolitics?.length > 0 ||
    articles?.topEntertainment?.length > 0 ||
    articles?.topBusiness?.length > 0 ||
    articles?.topCulture?.length ||
    articles?.topTechnology?.length > 0 ||
    articles?.topSports > 0;

  if (isLoading) return <TopStoriesSkeleton />;

  return (
    <div className="mt-10">
      {isVisible && (
        <>
          <h1 className="text-2xl font-bold">Top Stories</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6 mt-2">
            {articles?.topPolitics?.length > 0 && (
              <TopCategoryStories articles={articles?.topPolitics} />
            )}
            {articles?.topEntertainment?.length > 0 && (
              <TopCategoryStories articles={articles?.topEntertainment} />
            )}
            {articles?.topBusiness?.length > 0 && (
              <TopCategoryStories articles={articles?.topBusiness} />
            )}
            {articles?.topCulture?.length > 0 && (
              <TopCategoryStories articles={articles?.topCulture} />
            )}

            {articles?.topTechnology?.length > 0 && (
              <TopCategoryStories articles={articles?.topTechnology} />
            )}
            {articles?.topSports?.length > 0 && (
              <TopCategoryStories articles={articles?.topSports} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TopStories;
