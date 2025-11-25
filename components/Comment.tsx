import { CommentProp, ReplyProps } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import { useReplyComments } from "@/hooks/useComments";
import z from "zod";
import { FaArrowDown } from "react-icons/fa6";
import { Skeleton } from "./ui/skeleton";
import CommentContent from "./CommentContent";
import CommentThread from "./CommentThread";

export const commentSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

const Comment = ({
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

  const loadReplies = () => {
    fetchNextPage();
  };

  const allReplies = replies?.pages?.flatMap((page) => page?.replies) ?? [];

  const isExisting =
    allReplies &&
    allReplies?.[allReplies.length - 1]?.comment?.id !==
      replies?.pages[0]?.lastComment[0]?.id;

  return (
    <div className="mb-2 pb-4">
      <div className="">
        <CommentContent
          users={users}
          comment={comment}
          postId={postId}
          ownerId={ownerId}
          parentUser=""
        />
        {replies && (
          <div className="ml-6 mt-3  pl-4 relative">
            <div className="absolute left-[-10px] bottom-5 w-[2px] h-full bg-gray-300 rounded-bl-md" />

            {allReplies?.map((reply: ReplyProps) => (
              <div key={reply?.comment?.id} className="relative">
                <div className="absolute left-[-25px] top-2 w-3 h-3 border-l border-b border-gray-300 rounded-bl-md " />
                <CommentThread
                  comment={reply?.comment}
                  ownerId={ownerId}
                  users={reply.users}
                  depth={0}
                />
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
