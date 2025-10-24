import { Card } from "@/components/ui/card";
import { Article } from "@/lib/types/article";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TopSmallCards = ({ item }: { item: Article }) => {
  // console.log(JSON.parse(item.story));
  const texts = JSON.parse(item.story);
  console.log(texts[0]?.children);

  return (
    <Card className="flex items-center gap-4">
      <Link
        href={`/${item.category}/${item.id}/${item.title.replaceAll(" ", "-")}`}
      >
        <div className="md:w-32 md:h-22 h-32 w-32">
          <Image
            src={item.image}
            alt={`${item.title}`}
            height={140}
            width={140}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </Link>
      <div className="leading-4">
        <Link
          href={`/${item.category}/${item.id}/${item.title.replaceAll(
            " ",
            "-"
          )}`}
        >
          <h3 className="md:text-xs text-md line-clamp-2">{item.title}</h3>
        </Link>
        <span className="text-zinc-500 text-[.7rem] line-clamp-2 my-1">
          {texts[0]?.children[0]?.text + " " + texts[0]?.children[2]?.text}
        </span>

        <div className="flex gap-2 items-center text-zinc-400 text-[.7rem]">
          <span>
            <Clock width={13} />
          </span>
          <Separator className="w-0.5 h-3 bg-zinc-400" />
          <span>{calculateTime(item.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TopSmallCards;
