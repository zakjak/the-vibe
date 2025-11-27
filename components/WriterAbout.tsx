"use client";

import { useUserWriter } from "@/hooks/useUsers";
import WriterUserProfile from "./WriterUserProfile";
import { User } from "@/lib/types/users";
import SavedArticles from "./SavedArticles";

const WriterAbout = ({ profileId }: { profileId: string }) => {
  const { data } = useUserWriter(profileId);

  return (
    <div className="lg:w-[60rem] w-[90%] mx-auto">
      {data && (
        <WriterUserProfile
          userInfo={data?.userInfo as User[]}
          writerBio={data?.writerBio}
        />
      )}
      {data && <SavedArticles user={data?.userInfo[0] as User} />}
    </div>
  );
};

export default WriterAbout;
