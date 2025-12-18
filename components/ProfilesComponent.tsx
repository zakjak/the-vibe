"use client";

import { useProfiles } from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProfileCard from "./ProfileCard";
import ProfilePageSkeleton from "./ProfilePageSkeleton";
import { usePathname } from "next/navigation";

const ProfilesComponent = ({ slug }: { slug?: string }) => {
  const [visiblePageCount, setVisiblePageCount] = useState(2);
  const pathname = usePathname();

  const { ref, inView } = useInView({ threshold: 0 });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = slug
    ? useProfiles({ isLeader: true })
    : useProfiles({ isLeader: false });

  const visiblePages = data?.pages.slice(-visiblePageCount);
  const profiles = visiblePages?.flat();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setVisiblePageCount((prev) => prev + 1);
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isFetchingNextPage) {
    return <ProfilePageSkeleton />;
  }

  console.log(pathname.replaceAll("/", ""));

  return (
    <div className="bg-black h-screen text-white">
      <div className="w-[80%] mx-auto">
        <h1 className="text-2xl font-semibold py-8">
          The Vybe News{" "}
          {pathname.replace("/", "") === "profiles"
            ? "The Vybe News Profiles A-Z"
            : "Leadership"}
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-2 lg:w-240 md:w-160">
          {profiles?.map((profile) => (
            <ProfileCard key={profile?.id} profile={profile} />
          ))}
        </div>
        <div
          ref={ref}
          className="bg-red flex justify-center my-4 font-bold text-2xl"
        >
          {isFetchingNextPage ? (
            <ProfilePageSkeleton />
          ) : hasNextPage ? (
            <ProfilePageSkeleton />
          ) : (
            <div className="text-center mt-4">
              <p>No more articles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilesComponent;
