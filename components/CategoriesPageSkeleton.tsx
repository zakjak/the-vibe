import { Skeleton } from "./ui/skeleton";

const CategoriesPageSkeleton = () => {
  const stories = [1, 2, 3, 4, 5, 6];
  return (
    <div className="lg:w-[70rem] md:w-[40rem] w-[30rem] mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mx-12 mt-4 mb-6 gap-5">
        {stories.map((story) => (
          <div className="w-full" key={story}>
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

export default CategoriesPageSkeleton;
