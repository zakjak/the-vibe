import { Card } from "@/components/ui/card";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  story: string;
}

const TopSmallCards = ({ item }: { item: ItemProps }) => {
  return (
    <Card className="flex items-center gap-4">
      <Link
        href={`/${item.category}/${item.id}/${item.title.replaceAll(" ", "-")}`}
        className="lg:w-32 lg:h-22 h-20 w-18"
      >
        <Image
          src={item.image}
          alt={`${item.title}`}
          height={140}
          width={140}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      <div className="leading-4">
        <Link
          href={`/${item.category}/${item.id}/${item.title.replaceAll(
            " ",
            "-"
          )}`}
        >
          <h3 className="text-xs">{item.title}</h3>
        </Link>
        <span className="text-gray-500 text-[.7rem]">{item.title}</span>
        <div className="flex gap-2 items-center text-gray-500 text-[.7rem]">
          <span>
            <Clock width={13} />
          </span>
          <Separator className="w-0.5 h-3 bg-gray-500" />
          <span>{calculateTime(item.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TopSmallCards;
