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
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const TopStories = () => {
  const { data: articles, isLoading } = useLatestStories();

  if (isLoading) return <TopStoriesSkeleton />;

  return (
    <div className="mt-10">
      {articles && (
        <>
          <h1 className="text-2xl font-bold">Top Stories</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6 mt-2">
            <TopCategoryPolitics politics={articles?.topPolitics} />
            <TopCategoryEntertainment
              entertainment={articles?.topEntertainment}
            />
            <TopCategoryBusiness business={articles?.topBusiness} />
            <TopCategoryCulture culture={articles?.topCulture} />
            <TopCategoryTechnology technology={articles?.topTechnology} />
            <TopCategorySports sports={articles?.topSports} />
          </div>
        </>
      )}
    </div>
  );
};

export default TopStories;
