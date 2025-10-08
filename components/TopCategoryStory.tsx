import Image from "next/image";
import { Card } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const TopCategoryStory = ({ topStory }) => {
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
        />
      </Link>
      <div className="mt-2 leading-5">
        <Link
          href={`/${topStory?.category}/${
            topStory?.id
          }/${topStory?.title?.replaceAll(" ", "-")}`}
        >
          <h2 className="text-sm">{topStory?.title}</h2>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{topStory?.category}</span>
          <Separator className="h-4 w-0.5 bg-gray-400" />
          <span>{topStory?.date}</span>
        </div>
      </div>
    </Card>
  );
};

export default TopCategoryStory;
