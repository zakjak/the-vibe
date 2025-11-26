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
import { FaArrowDown } from "react-icons/fa6";
import { Skeleton } from "./ui/skeleton";
import { groupNumbers } from "@/lib/utils/helpers";

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "Comment can not be empty",
    })
    .trim()
    .max(300, { message: "Comment must not be more than 300 characters" }),
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
  const {
    data: comments,
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
  console.log();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="md:text-xl text-lg font-semibold my-2">
          Comments Section
        </h2>
        <span className="dark:bg-zinc-100 dark:text-zinc-800 bg-black text-white text-sm  rounded-md shadow-2xl py-2 px-2 font-bold">
          {groupNumbers(comments?.pages[0]?.commentCount)} comments
        </span>
      </div>
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
                <div className="pl-2">
                  <p>
                    Characters:{" "}
                    <span
                      className={`${
                        form.getValues("comment").length < 300
                          ? "text-white"
                          : "text-red-500"
                      }`}
                    >
                      {300 - form.getValues("comment").length}
                    </span>
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            className="absolute bottom-2 right-4 rounded-full cursor-pointer"
            size="icon"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <IoIosSend />}
          </Button>
        </form>
      </Form>
      <div className="my-2 pb-5 mt-8">
        {allComments?.map((item) => {
          if (!item) return null;
          const { comment, users }: { comment: CommentProp; users: User } =
            item;

          return (
            <Comment
              key={comment?.id}
              comment={comment}
              users={users}
              ownerId={ownerId}
              postId={comment?.postId}
            />
          );
        })}

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
          <p className="text-gray-400 text-center">
            {allComments?.length ? "No more comments" : "No Comments"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
