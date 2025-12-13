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
              <div>
                <h2 className="text-xl tracking-wider">Politics</h2>
                <TopCategoryStories articles={articles?.topPolitics} />
              </div>
            )}
            {articles?.topEntertainment?.length > 0 && (
              <div>
                <h2 className="text-xl tracking-wider">Entertainment</h2>
                <TopCategoryStories articles={articles?.topEntertainment} />
              </div>
            )}
            {articles?.topBusiness?.length > 0 && (
              <div>
                <h2 className="text-xl tracking-wider">Business</h2>
                <TopCategoryStories articles={articles?.topBusiness} />
              </div>
            )}
            {articles?.topCulture?.length > 0 && (
              <div>
                <h2 className="text-xl tracking-wider">Culture</h2>
                <TopCategoryStories articles={articles?.topCulture} />
              </div>
            )}

            {articles?.topTechnology?.length > 0 && (
              <div>
                <h2 className="text-xl tracking-wider">Technology</h2>
                <TopCategoryStories articles={articles?.topTechnology} />
              </div>
            )}
            {articles?.topSports?.length > 0 && (
              <div>
                <h2 className="text-xl tracking-wider">Sports</h2>
                <TopCategoryStories articles={articles?.topSports} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TopStories;
