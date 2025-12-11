import { Skeleton } from "./ui/skeleton";

const AboutUserSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 p-8 gap-2">
      <div className="relative w-full h-60 md:h-100">
        <div className="h-full w-full">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <div className="flex justify-between">
            <Skeleton className="w-40 h-5" />
          </div>
          <div className="mt-2">
            <Skeleton className="w-[20rem] h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUserSkeleton;
