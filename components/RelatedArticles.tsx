import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { calculateTime } from "@/lib/utils/helpers";

const RelatedArticles = ({ relatedArticles }) => {
  return (
    <div>
      {relatedArticles?.map((article) => (
        <Card key={article.id} className="mt-6">
          <Link
            href={`/${article.category}/${
              article.id
            }/${article.title.replaceAll(" ", "-")}`}
            className="lg:w-32 lg:h-22 h-20 w-18"
          >
            <Image
              src={article.image}
              alt={`${article.title}`}
              height={140}
              width={140}
              className="w-full h-full object-cover rounded-md"
            />
          </Link>
          <Link
            href={`/${article.category}/${
              article.id
            }/${article.title.replaceAll(" ", "-")}`}
          >
            <h2>{article.title}</h2>
          </Link>
          <div className="flex items-center gap-2">
            <span>{article?.category}</span>
            <Separator className="w-0.5 h-3 bg-gray-500" />
            <span className="flex gap-1 items-center">
              <Clock width={13} />
              {calculateTime(article?.date)}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RelatedArticles;
