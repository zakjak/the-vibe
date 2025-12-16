"use client";

import LatestStoryBanner from "./LatestStoryBanner";
import TopMainStoriesSkeleton from "./TopMainStoriesSkeleton";
import TopOtherStories from "./TopOtherStories";
import { useLatestStories } from "@/hooks/useLatestStories";

const TopMainStories = () => {
  const { data: article, isLoading } = useLatestStories();

  if (isLoading) return <TopMainStoriesSkeleton />;

  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-4 gap-8">
      {article?.topLeftStories && (
        <div className="lg:col-span-2 md:col-span-2  order-2 lg:order-1">
          <TopOtherStories articles={article?.topLeftStories} />
        </div>
      )}

      {article?.latestNews && (
        <div className="lg:col-span-4 md:col-span-4  order-1 lg:order-2">
          <LatestStoryBanner article={article?.latestNews[0]} />
        </div>
      )}
      {article?.topRightStories && (
        <div className="lg:col-span-2 md:col-span-2  order-3">
          <TopOtherStories articles={article?.topRightStories} />
        </div>
      )}
    </div>
  );
};

export default TopMainStories;
