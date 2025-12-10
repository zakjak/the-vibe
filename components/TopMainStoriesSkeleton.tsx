import React from "react";
import { Skeleton } from "./ui/skeleton";

const TopMainStoriesSkeleton = () => {
  const articles = [1, 2, 3];

  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-8 lg:max-w-280 md:max-w-200 mx-auto p-4">
        <div className="lg:col-span-4 md:col-span-2 ">
          <div className="flex flex-col gap-2 md:h-full h-80 ">
            <Skeleton className="w-fulll h-full rounded-xl" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-2 col-spa;n-8">
          <div className="mt-6 flex flex-col gap-4">
            {articles?.map((item) => (
              <div className="flex items-center gap-4" key={item}>
                <div className="md:w-32 md:h-22 h-32 w-32">
                  <Skeleton className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="leading-4">
                  <Skeleton className="h-4 w-[200px]" />
                  <div className="my-1">
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <div className="items-center">
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMainStoriesSkeleton;
