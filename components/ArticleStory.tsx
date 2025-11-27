"use client";
import { calculateTime, slugify } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { plateToHtml } from "@/lib/utils/plateToHtml";
import { Article } from "@/lib/types/article";
import { useSavedArticle, useToggleBookmark } from "@/hooks/useBookmarks";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { FaRegCopy, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import { User } from "@/lib/types/users";

const ArticleStory = ({
  articleStory,
}: {
  articleStory: { article: [Article, User[]] };
}) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const articleUrl = `${process.env.NEXT_PUBLIC_API_URL}/${
    articleStory?.article[0]?.category
  }/${
    articleStory?.article[0]?.id
  }/${articleStory?.article[0]?.title?.replaceAll(" ", "-")}`;

  const encodedTitle = encodeURIComponent(articleStory?.article[0]?.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${articleUrl}&text=${encodedTitle}`,
  };

  const { data: savedArticle, isLoading } = useSavedArticle(
    session?.user?.id as string
  );

  const { mutate, data: toggleMark } = useToggleBookmark(
    session?.user?.id as string
  );

  const isSaving =
    toggleMark?.some((item) => item.ownerId === session?.user?.id) ?? false;

  const isSavedData =
    savedArticle?.some((item) => item.ownerId === session?.user?.id) ?? false;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy", err);
      setCopied(false);
    }
  };

  return (
    <div className="lg:col-span-4 md:col-span-3 w-full col-span-6">
      <div className="">
        <h1 className="lg:text-3xl lg:font-semibold font-bold md:text-xl text-lg my-2">
          {articleStory?.article[0]?.title}
        </h1>
        <div className="flex items-center gap-1 mb-4">
          <span>{articleStory?.article[0]?.category}</span>
          <Separator className="bg-gray-400 h-4 w-0.5" />
          <span>{calculateTime(articleStory?.article[0]?.date)}</span>
        </div>
        <Image
          src={articleStory?.article[0]?.image || ""}
          alt={`${articleStory?.article[0]?.imageTitle}` || "image"}
          className="w-full h-full object-cover rounded-2xl"
          width={250}
          height={250}
        />
        <h3 className="text-xs text-zinc-400 mt-2">
          {articleStory?.article[0]?.imageTitle}
        </h3>
      </div>
      <div className="flex justify-between pt-6">
        <div className="">
          <h2>Image Source: {articleStory?.article[0]?.imageCredit}</h2>

          <div className="flex items-center gap-2">
            <h2>By: </h2>
            {articleStory?.article[1]?.map((user) => (
              <div key={user?.id} className="flex items-center gap-2">
                <Link
                  href={`/profiles/${slugify(user?.name as string)}/${
                    user?.id
                  }`}
                >
                  <Image
                    alt={`${user?.name} profile`}
                    src={user?.image as string}
                    width={240}
                    height={240}
                    className="rounded-full h-8 w-8 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>

                <Link
                  href={`/profiles/${slugify(user?.name as string)}/${
                    user?.id
                  }`}
                  className="cursor-pointer hover:underline text-sm"
                >
                  {user?.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <span className="flex items-center gap-1 cursor-pointer">
                <span className="hover:underline">Share:</span> <FaShareAlt />
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <div className="">
                {copied ? (
                  <div className="flex items-center gap-1">
                    <TiTick /> Copied Link
                  </div>
                ) : (
                  <Button variant="link" onClick={copyToClipboard}>
                    <FaRegCopy /> Copy Link
                  </Button>
                )}
              </div>
              <Link
                className="flex items-center gap-1"
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
              >
                <FaFacebookF /> Facebook
              </Link>
              <Link
                className="flex items-center gap-1"
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
              >
                <FaXTwitter /> Twitter
              </Link>
              <Link
                className="flex items-center gap-1"
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
              >
                <FaLinkedinIn /> LinkedIn
              </Link>
            </PopoverContent>
          </Popover>
          {session?.user ? (
            <span
              onClick={() => mutate(articleStory?.article[0]?.id ?? 0)}
              className="flex items-center gap-1 cursor-pointer"
            >
              {isSavedData || isSaving ? "Saved:" : "Save:"}
              {isSavedData || isSaving ? <FaBookmark /> : <FaRegBookmark />}
            </span>
          ) : (
            <span className="flex items-center gap-2 font-bold">
              <FaBookmark /> Login to save
            </span>
          )}
        </div>
      </div>
      <div className="prose mx-auto">
        {plateToHtml(
          JSON.parse(articleStory?.article[0]?.story),
          articleStory?.article[0]?.images
        )}
      </div>
    </div>
  );
};

export default ArticleStory;
