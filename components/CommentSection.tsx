import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Comment, Comments } from "@/lib/types/article";
import { CiMenuKebab } from "react-icons/ci";
import Image from "next/image";
import { calculateTime } from "@/lib/utils/helpers";
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
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Textarea } from "./ui/textarea";
import { IoIosSend, IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useAddComment, useDeleteComment } from "@/hooks/useComments";
import { useAddMoreComments } from "@/hooks/useArticle";
import { User } from "@/lib/types/users";
import { useState } from "react";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Spinner } from "./ui/spinner";
import { MdMessage } from "react-icons/md";

const commentSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

const CommentSection = ({
  postId,
  ownerId,
}: {
  postId: number;
  ownerId: string;
  comments: Comments[];
  isComments: number;
  setIsComments: (page: number) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate, isPending } = useAddComment();
  const { fetchNextPage, isFetchingNextPage, data } =
    useAddMoreComments(postId);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    const commentSection = {
      postId,
      ownerId,
      comment: values.comment,
    };

    mutate(commentSection);
    form.reset();
  };

  const moreComments = data && data[data?.length - 1]?.comments;

  const isExisting =
    data &&
    data[data?.length - 1]?.comments?.some(
      ({ comments }: { comments: Comment }) =>
        comments?.id === data[data?.length - 1]?.lastComment[0]?.id
    );

  const readMore = (text: string) => {
    const visibleText = expanded ? text : text.slice(0, 80) + "...";

    return visibleText;
  };

  return (
    <div>
      <h2 className="md:text-xl text-lg font-semibold my-2">
        Comments Section
      </h2>
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
                    className="min-h-[6rem] max-h-[6rem] w-[90%] bg-transparent! border-none no-scrollbar"
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
      <div className="my-2 pb-5">
        {moreComments?.map(
          ({ comments, users }: { comments: Comment; users: User }) => (
            <article key={comments?.id} className="mb-2 border-b pb-4">
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
                          {calculateTime(comments?.date)}
                        </span>
                      </div>
                      <div className="">
                        <p>{readMore(comments?.comment)}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <IoIosThumbsUp className="cursor-pointer" /> 23
                          </div>
                          <div className="flex items-center gap-1">
                            <IoIosThumbsDown className="cursor-pointer" /> 15
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

                      {comments?.comment?.length > 80 && (
                        <button
                          className="cursor-pointer text-zinc-500"
                          onClick={() => setExpanded(!expanded)}
                        >
                          {expanded ? "Show less" : "Read more..."}
                        </button>
                      )}
                    </div>
                    <div className="bg-zinc-200 text-blaxk hover:bg-zinc-500 cursor-pointer w-6 h-6 text-black flex items-center rounded-full justify-center">
                      {comments.ownerId === ownerId && (
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
                                    Are you sure you want to delete this
                                    comment?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this
                                    comment?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteComment(comments?.id)}
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
              </div>
            </article>
          )
        )}
        <div className="flex items-center gap-1 justify-center text-sm">
          {isFetchingNextPage ? (
            "Loading More..."
          ) : !isExisting ? (
            <div
              onClick={() => fetchNextPage()}
              className="cursor-pointer flex items-center gap-1"
            >
              {moreComments?.length > 5 && (
                <div>
                  <span>Load more</span>
                  <FaChevronDown className="" />
                </div>
              )}
            </div>
          ) : (
            <h1 className="text-center font-bold my-4">No More Comments</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
