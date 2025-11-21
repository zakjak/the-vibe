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
import { CommentProp } from "@/lib/types/article";
import { Textarea } from "./ui/textarea";
import { IoIosSend } from "react-icons/io";
import { useAddComment, useComments } from "@/hooks/useComments";
import { User } from "@/lib/types/users";
import { Spinner } from "./ui/spinner";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { Skeleton } from "./ui/skeleton";

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
}) => {
  const { mutate, isPending } = useAddComment();
  const [offset, setOffset] = useState(0);
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useComments(postId);

  const allComments =
    comments?.pages?.flatMap((page) => page.articleComments) ?? [];

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

  const isExisting =
    allComments &&
    allComments?.[allComments.length - 1]?.comment?.id !==
      comments?.pages[0]?.lastComment[0]?.id;

  const loadComment = () => {
    fetchNextPage();
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
        {allComments?.map(
          ({ comment, users }: { comment: CommentProp; users: User }) => (
            <Comment
              key={comment?.id}
              comment={comment}
              users={users}
              ownerId={ownerId}
              postId={postId}
            />
          )
        )}

        {isFetchingNextPage ? (
          <Skeleton />
        ) : isExisting ? (
          <div className=" flex items-center text-center justify-center">
            <div
              onClick={loadComment}
              className="cursor-pointer flex items-center text-sm font-semibold"
            >
              Show more
              <FaArrowDown />
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No more comments</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
