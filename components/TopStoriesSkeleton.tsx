import { Skeleton } from "./ui/skeleton";

const TopStoriesSkeleton = () => {
  const stories = [1, 2, 3, 4, 5, 6];
  const otherStories = [1, 2, 3, 4, 5];
  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6 mt-2">
        {stories.map((story) => (
          <div className="w-full" key={story}>
            <Skeleton className="h-4 w-[100px]" />
            <div className="mt-2">
              <Skeleton className="w-full h-[15rem]" />
              <div className="mt-4">
                <Skeleton className="h-4 w-[200px]" />
                <div className="flex items-center text-xs mt-2">
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStoriesSkeleton;
