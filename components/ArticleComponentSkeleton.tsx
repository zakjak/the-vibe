import { Skeleton } from "./ui/skeleton";

const ArticleComponentSkeleton = () => {
  const stories = [1, 2, 3, 4, 5];
  const relatedArticles = [1, 2, 3];

  return (
    <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mx-auto lg:max-w-[70rem] md:max-w-[50rem] max-w-[40rem] p-4">
      <div className="lg:col-span-4 md:col-span-3 w-full col-span-3">
        <div className="w-">
          <Skeleton className="h-4" />
          <div className="flex items-center gap-1 my-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-[20em] rounded-lg w-full" />
        </div>
        <div className="flex justify-between pt-6">
          <div className="">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="">
            <span className="flex items-center gap-1 mb-2">
              <Skeleton className="h-4 w-[100px]" />
            </span>
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <div className="pt-4">
          {stories.map((story) => (
            <Skeleton key={story} className="h-4 mt-2" />
          ))}
        </div>
      </div>

      <div className="md:col-span-2 col-span-3">
        <h2 className="text-xl font-bold leading-2 tracking-wide ">
          <Skeleton className="h-4 w-[200px]" />
        </h2>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-1">
          {relatedArticles.map((article) => (
            <div key={article} className="mt-6 flex flex-col gap-4">
              <div className=" ">
                <Skeleton className="h-[200px] w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-3 w-[200px]" />
                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2">
                  <span className="flex gap-2 items-center">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleComponentSkeleton;
