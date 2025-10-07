import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { calculateTime } from "@/lib/utils/helpers";

const RelatedArticles = ({ relatedArticles }) => {
  return (
    <div className="w-full col-span-3 md:col-span-1">
      <h2 className="text-xl font-bold leading-2 tracking-wide">
        Top Related Articles
      </h2>
      <div className="grid grid-cols-2 gap-2 md:gap- md:grid-cols-1">
        {relatedArticles?.map((article) => (
          <Card key={article.id} className="mt-6">
            <div className="lg:w-32 lg:h-22 md:h-[15rem] h-[13rem]">
              <Link
                href={`/${article.category}/${
                  article.id
                }/${article.title.replaceAll(" ", "-")}`}
                className=""
              >
                <Image
                  src={article.image}
                  alt={`${article.title}`}
                  height={140}
                  width={140}
                  className="w-full h-full object-cover rounded-md"
                />
              </Link>
            </div>
            <div>
              <Link
                href={`/${article.category}/${
                  article.id
                }/${article.title.replaceAll(" ", "-")}`}
              >
                <h2>{article.title}</h2>
              </Link>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>{article?.category}</span>
                <Separator className="w-0.5 h-3 bg-gray-500" />
                <span className="flex gap-1 items-center">
                  <Clock width={13} />
                  {calculateTime(article?.date)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
