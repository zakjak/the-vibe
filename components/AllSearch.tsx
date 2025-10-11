"use client";

import { useSearch } from "@/hooks/useSearch";
import { Article } from "@/lib/types/article";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Image from "next/image";
import { calculateTime } from "@/lib/utils/helpers";
import PaginationComponent from "./PaginationComponent";

const AllSearch = () => {
  const [] = useState(1);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const q = String(searchParams.get("q"));

  const { data } = useSearch(q, page);

  const articles: Article[] = data?.search;

  const totalArticles = (page: number) => {
    if (page * 10 < data?.countRows[0]?.count) {
      if (page <= 1) {
        return `Displaying ${page}-${page * 10} results out of ${" "}
                ${data?.countRows[0]?.count} for ${q.replaceAll("+", " ")}`;
      } else {
        return `Displaying ${(page - 1) * 10 + 1}-${
          data?.countRows[0]?.count
        } results out of ${" "}
                ${data?.countRows[0]?.count} for ${q.replaceAll("+", " ")}`;
      }
    } else {
      return `Displaying ${(page - 1) * 10 + 1}-${
        data?.countRows[0]?.count
      } results out of ${" "}
                ${data?.countRows[0]?.count} for ${q.replaceAll("+", " ")}`;
    }
  };

  return (
    <div className="m-8">
      <div className="">
        <h2 className="text-lg font-bold">{totalArticles(page)}</h2>
      </div>
      {articles && (
        <div className="">
          {articles?.map((article) => (
            <div key={article?.id} className="border-b pb-6 pt-4">
              <Card className="mt-2 flex gap-2 md:h-[11rem] h-[6rem]">
                <Link
                  href={`/${article?.category}/${article?.id}/${
                    article && article?.title?.replaceAll(" ", "-")
                  }`}
                >
                  <div className="h-full">
                    <Image
                      src={article?.image}
                      width={240}
                      height={240}
                      alt={`${article?.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="mt-4 leading-8 w-[70%]">
                  <Link
                    href={`/${article?.category}/${
                      article?.id
                    }/${article?.title?.replaceAll(" ", "-")}`}
                  >
                    <h2 className="text-md">{article.title}</h2>
                  </Link>
                  <div className="text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>{article?.category}</span>
                      <Separator className="h-4 w-0.5 bg-gray-400" />
                      <span>{calculateTime(article?.date)}</span>
                    </div>
                    <span className="text-black md:line-clamp-2 my-2 lg:line-clamp-3 dark:text-zinc-400 font-semibold text-[.9rem] hidden">
                      {article.story}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
          <div className="mt-8">
            {data?.pageNumber > 1 && (
              <PaginationComponent pageNumber={data?.pageNumber} query={q} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSearch;
