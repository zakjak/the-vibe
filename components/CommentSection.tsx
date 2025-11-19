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
import { CommentProp, Comments } from "@/lib/types/article";
import { Textarea } from "./ui/textarea";
import { IoIosSend } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useAddComment } from "@/hooks/useComments";
import { useAddMoreComments } from "@/hooks/useArticle";
import { User } from "@/lib/types/users";
import { Spinner } from "./ui/spinner";
import Comment from "./Comment";

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
      ({ comments }: { comments: CommentProp }) =>
        comments?.id === data[data?.length - 1]?.lastComment[0]?.id
    );

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
          ({ comments, users }: { comments: CommentProp; users: User }) => (
            <Comment
              key={comments?.id}
              comment={comments}
              users={users}
              ownerId={ownerId}
            />
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
