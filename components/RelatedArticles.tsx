import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { calculateTime } from "@/lib/utils/helpers";
import { Article } from "@/lib/types/article";

const RelatedArticles = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="md:col-span-2 col-span-6 md:pt-5">
      {articles.length >= 1 && (
        <h2 className="font-bold leading-2 tracking-wide lg:text-2xl lg:font-semibold md:text-xl">
          Top Related Articles
        </h2>
      )}

      <div className="grid gap-3 grid-cols-2 md:grid-cols-1">
        {articles?.map((article) => (
          <Card key={article.id} className="mt-6">
            <div className=" ">
              <Link
                href={`/${article.category}/${
                  article.id
                }/${article.title.replaceAll(" ", "-")}`}
                className="w-full"
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
                <h2 className="line-clamp-2">{article.title}</h2>
              </Link>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="font-bold text-xs tracking-wider">
                  {article?.category?.toUpperCase()}
                </span>
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
