"use client";

import LatestStoryBanner from "./LatestStoryBanner";
import TopMainStoriesSkeleton from "./TopMainStoriesSkeleton";
import TopOtherStories from "./TopOtherStories";
import { useLatestStories } from "@/hooks/useLatestStories";

const TopMainStories = () => {
  const { data: article, isLoading } = useLatestStories();

  if (isLoading) return <TopMainStoriesSkeleton />;

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-8">
      {article?.length && (
        <div className="lg:col-span-4 md:col-span-2 col-span-8">
          <LatestStoryBanner article={article?.latestPolitics[0]} />
        </div>
      )}

      {article?.length && (
        <div className="lg:col-span-2 md:col-span-2 col-span-8">
          <TopOtherStories articles={article?.topOtherStories} />
        </div>
      )}
    </div>
  );
};

export default TopMainStories;
