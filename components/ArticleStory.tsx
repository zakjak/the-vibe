"use client";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { plateToHtml } from "@/lib/utils/plateToHtml";
import { Article } from "@/lib/types/article";

const ArticleStory = ({ article }: { article: Article }) => {
  // const html = plateToHtml(JSON.parse(article.story));

  return (
    <div className="col-span-2 lg:w-[40rem] md:w-[29rem]">
      <div>
        <h1>{article?.title}</h1>
        <div className="flex items-center gap-1 mb-4">
          <span>{article?.category}</span>
          <Separator className="bg-gray-400 h-4 w-0.5" />
          <span>{calculateTime(article?.date)}</span>
        </div>
        <Image
          src={article?.image}
          alt={`${article?.title}`}
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
          <span className="flex items-center gap-1">
            Save: <FaSave />
          </span>
        </div>
      </div>
      <div className="pt-6">
        {/* <article>{article[0].story}</article> */}
        <div
          className="prose max-w-none"
          // dangerouslySetInnerHTML={{ __html: html }}
        />
        <p>{article?.story}</p>
      </div>
    </div>
  );
};

export default ArticleStory;
