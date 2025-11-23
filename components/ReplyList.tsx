import { CommentProp, ReplyProps } from "@/lib/types/article";
import { User } from "@/lib/types/users";

import { useReplyComments } from "@/hooks/useComments";
import { FaArrowDown } from "react-icons/fa6";
import { Skeleton } from "./ui/skeleton";
import CommentContent from "./CommentContent";

const ReplyList = ({
  comment,
  users,
  ownerId,
  postId,
}: {
  comment: CommentProp;
  users: User;
  ownerId: string;
  postId: number;
}) => {
  const {
    data: replies,
    fetchNextPage,
    isFetchingNextPage,
  } = useReplyComments(comment?.id);

  const allReplies = replies?.pages?.flatMap((page) => page.replies) ?? [];

  const loadReplies = () => {
    fetchNextPage();
  };

  const isExisting =
    replies?.pages[0]?.lastComment?.length > 0 &&
    allReplies?.length > 0 &&
    allReplies?.[allReplies.length - 1]?.comment?.id !==
      replies?.pages[0]?.lastComment[0]?.id;

  console.log(allReplies);

  return (
    <div className="mb-2 pb-4">
      <div className="">
        <CommentContent
          users={users}
          comment={comment}
          postId={postId}
          ownerId={ownerId}
        />

        <div className="ml-6 mt-3  pl-4 relative">
          <div className="absolute left-[-10px] bottom-5 w-[2px] h-full bg-gray-300 rounded-bl-md" />

          {allReplies?.map((reply: ReplyProps) => (
            <div key={reply?.comment?.id} className="relative">
              <div className="absolute left-[-25px] top-2 w-3 h-3 border-l border-b border-gray-300 rounded-bl-md " />
              <p>{reply?.comment?.comment}</p>
              <CommentContent
                comment={reply?.comment}
                users={reply?.users}
                postId={reply?.comment?.postId}
                ownerId={reply?.users?.id}
              />
            </div>
          ))}
        </div>
        {isFetchingNextPage ? (
          <Skeleton />
        ) : (
          isExisting && (
            <div className=" flex items-center text-center justify-center my-2">
              <div
                onClick={loadReplies}
                className="cursor-pointer flex items-center text-sm font-semibold"
              >
                Show more replies
                <FaArrowDown />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReplyList;
