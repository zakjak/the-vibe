import { Input } from "./ui/input";
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { IoIosSend } from "react-icons/io";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAddComment } from "@/hooks/useComments";

const commentSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

const CommentSection = ({
  postId,
  ownerId,
  comments,
}: {
  postId: number;
  ownerId: string;
  comments: Comments[];
}) => {
  const { mutate, isPending } = useAddComment();

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

  return (
    <div>
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
                    className="min-h-[6rem] max-h-[6rem] w-[90%] bg-transparent! border-none"
                    placeholder="Enter comment..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="absolute bottom-3 right-5 rounded-full cursor-pointer"
            type="submit"
          >
            {isPending ? "Loading" : <IoIosSend />}
          </Button>
        </form>
      </Form>
      <div className="my-2 border-b pb-5">
        <h2 className="text-xl font-semibold my-2">Comments</h2>
        {comments?.map(({ comments, users }) => (
          <article key={comments?.id} className="mb-2 border-b pb-4">
            <div className="">
              <header className="flex gap-2">
                <Image
                  className="w-8 h-8 object-cover rounded-full"
                  src={users?.profilePicture}
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
                    <p className="text-sm">{comments?.comment}</p>
                  </div>
                  <div className="bg-zinc-200 text-blaxk hover:bg-zinc-500 cursor-pointer w-6 h-6 text-black flex items-center rounded-full justify-center">
                    <Popover>
                      <PopoverTrigger>
                        <CiMenuKebab />
                      </PopoverTrigger>
                      <PopoverContent className="mt-2">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button>Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this comment?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </header>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
