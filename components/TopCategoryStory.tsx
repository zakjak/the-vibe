import Image from "next/image";
import { Card } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { calculateTime } from "@/lib/utils/helpers";
import { Article } from "@/lib/types/article";

const TopCategoryStory = ({ topStory }: { topStory: Article }) => {
  return (
    <Card className="mt-2">
      <Link
        href={`/${topStory?.category}/${topStory?.id}/${
          topStory && topStory?.title?.replaceAll(" ", "-")
        }`}
      >
        <Image
          src={topStory?.image}
          width={240}
          height={240}
          alt={`${topStory?.title}`}
          className="w-full"
        />
      </Link>
      <div className="mt-4 leading-8">
        <Link
          href={`/${topStory?.category}/${
            topStory?.id
          }/${topStory?.title?.replaceAll(" ", "-")}`}
        >
          <h2 className="text-md">{topStory?.title}</h2>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{topStory?.category}</span>
          <Separator className="h-4 w-0.5 bg-gray-400" />
          <span>{calculateTime(topStory?.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TopCategoryStory;
