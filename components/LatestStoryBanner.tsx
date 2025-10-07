import { Card, CardFooter } from "@/components/ui/card";
import { calculateTime } from "@/lib/utils/helpers";
// import data from "@/data.json";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";
const LatestStoryBanner = ({ article }) => {
  return (
    <Card className="flex flex-col gap-2">
      {article && (
        <>
          <Link
            href={`/${article[0]?.category}/${
              article[0]?.id
            }/${article[0]?.title.replaceAll(" ", "-")}`}
          >
            <Image
              src={article[0]?.image}
              alt={`${article[0]?.title}`}
              height={240}
              className="w-full h-full object-cover rounded-xl"
              width={240}
            />
          </Link>
          <Link
            href={`/${article[0]?.category}/${
              article[0]?.id
            }/${article[0]?.title.replaceAll(" ", "-")}`}
          >
            <h2 className="font-bold">{article[0]?.title}</h2>
          </Link>
          <CardFooter className="text-xs flex gap-2">
            <span>{article[0]?.category}</span>
            <Separator className="bg-gray-400 h-4 w-0.5" />
            <span>{calculateTime(article[0]?.date)}</span>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default LatestStoryBanner;
