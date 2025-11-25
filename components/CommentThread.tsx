import { useReplyComments } from "@/hooks/useComments";
import { CommentProp, ReplyProps } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import React, { useState } from "react";
import CommentContent from "./CommentContent";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { FaArrowDown } from "react-icons/fa6";
const CommentThread = ({
  comment,
  ownerId,
  users,
  depth,
}: {
  comment: CommentProp;
  ownerId: string;
  users: User;
  depth: number;
}) => {
  const {
    data: replies,
    fetchNextPage,
    isFetchingNextPage,
  } = useReplyComments(comment?.id);
  const [showCollapsed, setShowCollapsed] = useState(false);

  const allReplies = replies?.pages?.flatMap((page) => page.replies) ?? [];

  const indent = Math.min(depth * 20, 120);

  const showParentName = depth >= 1 ? replies?.pages[0]?.parentUser : "";

  if (depth > 2 && !showCollapsed) {
    return (
      <div style={{ marginLeft: indent }} className="mt-3">
        <CommentContent
          key={comment?.id}
          comment={comment}
          users={users}
          ownerId={ownerId}
          postId={comment?.postId}
          parentUser={showParentName}
        />
        {allReplies?.length > 0 && (
          <Button onClick={() => setShowCollapsed(!showCollapsed)}>
            View {allReplies.length} replies
          </Button>
        )}
      </div>
    );
  }

  const isExisting =
    allReplies &&
    allReplies?.[allReplies.length - 1]?.comment?.id !==
      replies?.pages[0]?.lastComment[0]?.id;

  return (
    <div className="mt-3 relative" style={{ marginLeft: indent }}>
      <CommentContent
        key={comment?.id}
        comment={comment}
        users={users}
        ownerId={ownerId}
        postId={comment?.postId}
        parentUser={showParentName}
      />

      {allReplies?.map((reply: ReplyProps) => (
        <div className="relative ml-6" key={reply?.comment?.id}>
          <div className="absolute left-[-10px] bottom-5 w-[2px] h-full bg-gray-300 rounded-bl-md" />
          <div className="absolute left-[-9px] top-2 w-3 h-3 border-l border-b border-gray-300 rounded-bl-md " />

          <div className="ml-2">
            <CommentThread
              comment={reply?.comment}
              users={reply?.users}
              ownerId={ownerId}
              depth={depth + 1}
            />
          </div>
        </div>
      ))}

      {isFetchingNextPage ? (
        <Skeleton />
      ) : (
        isExisting && (
          <div className=" flex items-center text-center justify-center my-2">
            <div
              onClick={() => fetchNextPage()}
              className="cursor-pointer flex items-center text-sm font-semibold"
            >
              Show more replies
              <FaArrowDown />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CommentThread;
