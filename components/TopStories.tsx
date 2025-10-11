"use client";

import TopCategoryBusiness from "./TopCategoryBusiness";
import TopCategoryCulture from "./TopCategoryCulture";
import TopCategoryEntertainment from "./TopCategoryEntertainment";
import TopCategoryPolitics from "./TopCategoryPolitics";
import TopCategoryTechnology from "./TopCategoryTechnology";
import TopCategoryInnovation from "./TopCategoryInnovation";
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
            <TopCategoryPolitics articles={articles?.topPolitics} />
            <TopCategoryEntertainment articles={articles?.topEntertainment} />
            <TopCategoryBusiness articles={articles?.topBusiness} />
            <TopCategoryCulture articles={articles?.topCulture} />
            <TopCategoryTechnology articles={articles?.topTechnology} />
            <TopCategorySports articles={articles?.topSports} />
          </div>
        </>
      )}
    </div>
  );
};

export default TopStories;
