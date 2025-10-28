import Image from "next/image";
import { Card } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { calculateTime } from "@/lib/utils/helpers";
import { Article } from "@/lib/types/article";
import { useDeleteArticle } from "@/hooks/useArticle";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "next/navigation";
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

const TopCategoryStory = ({
  topStory,
  activeTab,
}: {
  topStory: Article;
  activeTab?: string;
}) => {
  const { mutate } = useDeleteArticle();
  const params = useParams();
  const { id } = params;

  return (
    <Card className="mt-2">
      <div className="relative">
        <Link
          href={`/${topStory?.category}/${topStory?.id}/${
            topStory && topStory?.title?.replaceAll(" ", "-")
          }`}
        >
          <Image
            src={topStory?.image}
            width={240}
            height={240}
            alt={`${topStory?.title}`}
            className=" w-full h-[12rem] object-cover"
          />
        </Link>
        {id == topStory?.ownerId && activeTab !== "saved" && (
          <AlertDialog>
            <AlertDialogTrigger className="absolute top-3 right-3 text-xl font-bold bg-red-400 p-2 rounded-md cursor-pointer">
              <AiOutlineDelete />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure, you want to delete
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your article and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutate(topStory?.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <div className="mt-4 leading-8">
        <Link
          href={`/${topStory?.category}/${
            topStory?.id
          }/${topStory?.title?.replaceAll(" ", "-")}`}
        >
          <h2 className="text-md line-clamp-2">{topStory?.title}</h2>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{topStory?.category}</span>
          <Separator className="h-4 w-0.5 bg-gray-400" />
          <span>{calculateTime(topStory?.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TopCategoryStory;
