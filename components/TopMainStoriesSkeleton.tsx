import { Skeleton } from "./ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

const TopMainStoriesSkeleton = () => {
  const articles = [1, 2];
  //
  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-4 gap-8">
      <div className="lg:col-span-2 md:col-span-2  order-2 lg:order-1">
        <div className="mt-2 flex flex-col gap-4">
          <div className="w-full lg:h-48 md:h-62 h-60">
            <Skeleton className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="mt-1 flex flex-col gap-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="w-15 h-4" />
            <Separator className="w-0.5 h-4 bg-zinc-400" />
            <Skeleton className="w-15 h-4" />
          </div>
          {articles.map((article) => (
            <div key={article} className="flex flex-col gap-2 mt-2">
              <Separator className="h-0.5 w-full bg-gray-300" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Separator className="w-0.5 h-4 bg-zinc-400" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-4 md:col-span-4  order-1 lg:order-">
        <div className="flex flex-col gap-2 w-full h-full">
          <Skeleton className="w-fulll h-92 rounded-xl" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-[60px]" />
            <Separator className="w-0.5 h-4 bg-zinc-400" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2  order-2 lg:order-1">
        <div className="mt-2 flex flex-col gap-4">
          <div className="w-full lg:h-48 md:h-62 h-60">
            <Skeleton className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="mt-1 flex flex-col gap-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="w-15 h-4" />
            <Separator className="w-0.5 h-4 bg-zinc-400" />
            <Skeleton className="w-15 h-4" />
          </div>
          {articles.map((article) => (
            <div key={article} className="flex flex-col gap-2 mt-2">
              <Separator className="h-0.5 w-full bg-gray-300" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Separator className="w-0.5 h-4 bg-zinc-400" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMainStoriesSkeleton;
