import { CommentProp, ReplyProps } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { MdMessage } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import Image from "next/image";
import { calculateTime } from "@/lib/utils/helpers";
import { IoIosSend, IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import {
  useAddComment,
  useDeleteComment,
  useReplyComments,
} from "@/hooks/useComments";
import { useAddVotes, useVotes, VoteProps } from "@/hooks/useVotes";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { IoThumbsDownOutline, IoThumbsUpOutline } from "react-icons/io5";
import ReplyList from "./ReplyList";
import { FaArrowDown } from "react-icons/fa6";
import { Skeleton } from "./ui/skeleton";

const commentSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

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
  const [isReply, setIsReply] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate, isPending } = useAddComment();
  const {
    data: replies,
    fetchNextPage,
    isFetchingNextPage,
  } = useReplyComments(comment?.id);

  const { mutate: mutateVotes, isPending: isVotesPending } = useAddVotes();

  const { data } = useVotes(comment?.id);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const readMore = (text: string) => {
    const visibleText = expanded ? text : text.slice(0, 80) + "...";

    return visibleText;
  };

  const voteComment = (data: VoteProps) => {
    mutateVotes(data);
  };

  const onSubmit = (values: CommentFormValues) => {
    const commentSection = {
      postId,
      ownerId,
      comment: values.comment,
      parentId: comment?.id,
    };
    mutate(commentSection);
    form.reset();
    setIsReply(false);
  };

  const loadReplies = () => {
    fetchNextPage();
  };

  const allReplies = replies?.pages?.flatMap((page) => page.replies) ?? [];

  const isExisting =
    allReplies &&
    allReplies?.[allReplies.length - 1]?.comment?.id !==
      replies?.pages[0]?.lastComment[0]?.id;

  return (
    <div className="mb-2 pb-4">
      <div className="">
        <header className="flex gap-2">
          <Image
            className="w-8 h-8 object-cover rounded-full"
            src={users?.image || ""}
            alt={`Image of ${users?.name}`}
            height={200}
            width={2000}
          />
          <div className="flex justify-between w-full">
            <div className="w-[90%]">
              <div className="flex gap-2 text-sm">
                <span className="font-semibold">{users?.name}</span>
                <span className="text-zinc-400">
                  {calculateTime(comment?.date)}
                </span>
              </div>
              <div className="">
                <p>{comment && readMore(comment?.comment)}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {data?.voteComment?.vote === 1 ? (
                      <IoIosThumbsUp
                        onClick={() =>
                          voteComment({
                            commentId: comment?.id,
                            type: 1,
                            userId: users.id,
                          })
                        }
                        className="cursor-pointer"
                      />
                    ) : (
                      <IoThumbsUpOutline
                        onClick={() =>
                          voteComment({
                            commentId: comment?.id,
                            type: 1,
                            userId: users.id,
                          })
                        }
                        className="cursor-pointer"
                      />
                    )}
                    <span>{data?.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {data?.voteComment?.vote === -1 ? (
                      <IoIosThumbsDown
                        onClick={() =>
                          voteComment({
                            commentId: comment?.id,
                            type: -1,
                            userId: users.id,
                          })
                        }
                        className="cursor-pointer"
                      />
                    ) : (
                      <IoThumbsDownOutline
                        onClick={() =>
                          voteComment({
                            commentId: comment?.id,
                            type: -1,
                            userId: users.id,
                          })
                        }
                        className="cursor-pointer"
                      />
                    )}
                    <span>{data?.dislikes}</span>
                  </div>
                  <div
                    onClick={() => setIsReply(!isReply)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <MdMessage /> reply
                  </div>
                </div>
                {isReply && (
                  <Form {...form}>
                    <form
                      className="flex gap-2 border rounded-xl pb-5 relative"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Textarea
                                className="min-h-[4em] max-h-[4rem] w-[90%] bg-transparent! border-none no-scrollbar"
                                placeholder="Enter comment..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="absolute bottom-2 right-4 rounded-full cursor-pointer"
                        size="icon"
                        type="submit"
                      >
                        {isPending ? <Spinner /> : <IoIosSend />}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>

              {comment?.comment?.length > 80 && (
                <button
                  className="cursor-pointer text-zinc-500"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less" : "Read more..."}
                </button>
              )}
            </div>
            <div className="bg-zinc-200 text-blaxk hover:bg-zinc-500 cursor-pointer w-6 h-6 text-black flex items-center rounded-full justify-center">
              {comment?.ownerId === ownerId && (
                <Popover>
                  <PopoverTrigger>
                    <CiMenuKebab />
                  </PopoverTrigger>
                  <PopoverContent className="mt-2">
                    <AlertDialog>
                      <AlertDialogTrigger className="text-red-400 font-semibold">
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this comment?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this comment?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteComment(comment?.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </header>
        {replies && (
          <div className="ml-6 mt-3  pl-4 relative">
            <div className="absolute left-[-10px] bottom-5 w-[2px] h-full bg-gray-300 rounded-bl-md" />

            {allReplies?.map((reply: ReplyProps) => (
              <div key={reply?.comment?.id} className="relative">
                <div className="absolute left-[-25px] top-2 w-3 h-3 border-l border-b border-gray-300 rounded-bl-md " />
                <ReplyList
                  comment={reply?.comment}
                  users={reply?.users}
                  ownerId={reply?.users?.id}
                  postId={postId}
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
