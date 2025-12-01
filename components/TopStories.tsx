"use client";

import TopCategoryBusiness from "./TopCategoryBusiness";
import TopCategoryCulture from "./TopCategoryCulture";
import TopCategoryEntertainment from "./TopCategoryEntertainment";
import TopCategoryPolitics from "./TopCategoryPolitics";
import TopCategoryTechnology from "./TopCategoryTechnology";
import { useLatestStories } from "@/hooks/useLatestStories";
import TopCategorySports from "./TopCategorySports";
import TopStoriesSkeleton from "./TopStoriesSkeleton";

const TopStories = () => {
  const { data: articles, isLoading } = useLatestStories();

  if (isLoading) return <TopStoriesSkeleton />;

  return (
    <div className="mt-10">
      {articles && (
        <>
          <h1 className="text-2xl font-bold">Top Stories</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6 mt-2">
            {articles?.topPolitics?.length > 0 && (
              <TopCategoryPolitics articles={articles?.topPolitics} />
            )}
            {articles?.topEntertainment?.length > 0 && (
              <TopCategoryEntertainment articles={articles?.topEntertainment} />
            )}
            {articles?.topBusiness?.length > 0 && (
              <TopCategoryBusiness articles={articles?.topBusiness} />
            )}
            {articles?.topCulture?.length > 0 && (
              <TopCategoryCulture articles={articles?.topCulture} />
            )}

            {articles?.topTechnology?.length > 0 && (
              <TopCategoryTechnology articles={articles?.topTechnology} />
            )}
            {articles?.topSports?.length > 0 && (
              <TopCategorySports articles={articles?.topSports} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TopStories;
