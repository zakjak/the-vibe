"use client";

import { useUserWriter } from "@/hooks/useUsers";
import WriterUserProfile from "./WriterUserProfile";
import { User } from "@/lib/types/users";
import SavedArticles from "./SavedArticles";
import AboutUserSkeleton from "./AboutUserSkeleton";
import { useSession } from "next-auth/react";

const WriterAbout = ({ profileId }: { profileId: string }) => {
  const { data, isFetching } = useUserWriter(profileId);
  const { data: session } = useSession();

  return (
    <div className="lg:w-240 w-[90%] mx-auto">
      {data && !isFetching ? (
        <WriterUserProfile
          userInfo={data?.userInfo as User[]}
          writerBio={data?.writerBio}
        />
      ) : (
        <AboutUserSkeleton />
      )}
      {data && (
        <SavedArticles
          user={data?.userInfo[0] as User}
          userId={session?.user?.id as string}
        />
      )}
    </div>
  );
};

export default WriterAbout;
