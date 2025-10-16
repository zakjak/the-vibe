"use client";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { plateToHtml } from "@/lib/utils/plateToHtml";
import { Article } from "@/lib/types/article";
import { useSavedArticle, useToggleBookmark } from "@/hooks/useBookmarks";
import { useSession } from "next-auth/react";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const ArticleStory = ({ article }: { article: Article }) => {
  const { data: session } = useSession();

  const {
    data: savedArticle,
    isSuccess,
    isLoading,
  } = useSavedArticle(article?.id);
  const { mutate, data: toggleMark } = useToggleBookmark(
    session?.user?.id as string
  );

  const isSaving =
    toggleMark?.some((item) => item.ownerId === session?.user?.id) ?? false;

  const isSavedData =
    savedArticle?.some((item) => item.ownerId === session?.user?.id) ?? false;

  return (
    <div className="lg:col-span-4 md:col-span-3">
      <div className="">
        <h1>{article?.title}</h1>
        <div className="flex items-center gap-1 mb-4">
          <span>{article?.category}</span>
          <Separator className="bg-gray-400 h-4 w-0.5" />
          <span>{calculateTime(article?.date)}</span>
        </div>
        <Image
          src={article?.image || ""}
          alt={`${article?.title}` || "image"}
          className="w-full h-full object-cover rounded-2xl"
          width={250}
          height={250}
        />
      </div>
      <div className="flex justify-between pt-6">
        <div className="">
          <h2>Image Source: {article?.imageCredit}</h2>
          <h2>Author: {article?.author}</h2>
        </div>
        <div>
          <span className="flex items-center gap-1">
            Share: <FaShareAlt />
          </span>
          <span
            onClick={() => mutate(article?.id)}
            className="flex items-center gap-1 cursor-pointer"
          >
            {isSavedData || isSaving ? "Saved:" : "Save:"}
            {isSavedData || isSaving ? <FaBookmark /> : <FaRegBookmark />}
          </span>
        </div>
      </div>
      <div className="prose mx-auto">
        {plateToHtml(JSON.parse(article?.story), article?.images)}
      </div>
    </div>
  );
};

export default ArticleStory;
