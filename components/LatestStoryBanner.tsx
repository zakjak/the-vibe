import { Card, CardFooter } from "@/components/ui/card";
import { Article } from "@/lib/types/article";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";
const LatestStoryBanner = ({ article }: { article: Article }) => {
  console.log(article);
  return (
    <Card className="flex flex-col gap-2">
      {article && (
        <>
          <Link
            href={`/${article?.category}/${
              article?.id
            }/${article?.title.replaceAll(" ", "-")}`}
          >
            <div className="h-full w-full">
              <Image
                src={article?.image}
                alt={`${article?.title}`}
                height={240}
                className="w-full h-full object-cover rounded-xl"
                width={240}
              />
            </div>
          </Link>
          <Link
            href={`/${article?.category}/${
              article?.id
            }/${article?.title.replaceAll(" ", "-")}`}
          >
            <h2 className="font-bold">{article?.title}</h2>
          </Link>
          <CardFooter className="text-xs flex gap-2">
            <span>{article?.category}</span>
            <Separator className="bg-gray-400 h-4 w-0.5" />
            <span>{calculateTime(article?.date)}</span>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default LatestStoryBanner;
