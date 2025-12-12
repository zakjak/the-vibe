import { Card } from "@/components/ui/card";
import { Article } from "@/lib/types/article";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TopSmallCards = ({ article }: { article: Article }) => {
  const texts = JSON.parse(article.story);

  return (
    <Card className="">
      <Link
        href={`/${article.category}/${article.id}/${article.title.replaceAll(
          " ",
          "-"
        )}`}
      >
        {/* w-full h-72 lg:h-48 md:h-62 */}
        <div className="w-full lg:h-48 md:h-62 h-60">
          <Image
            src={article.image}
            alt={`${article.title}`}
            height={140}
            width={140}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className="leading-4 mt-1">
        <Link
          href={`/${article.category}/${article.id}/${article.title.replaceAll(
            " ",
            "-"
          )}`}
        >
          <h3 className="md:text-[13px] text-md line-clamp-2 hover:underline">
            {article.title}
          </h3>
        </Link>
        {/* <span className="text-zinc-500 text-[.7rem] line-clamp-2 my-1">
          {texts[0]?.children[0]?.text + " " + texts[0]?.children[2]?.text}
        </span> */}

        <div className="flex gap-2 items-center text-zinc-400 text-[.7rem]">
          <span>{article?.category}</span>
          <Separator className="w-0.5 h-3 bg-zinc-400" />
          <span>{calculateTime(article.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TopSmallCards;
