import { Card, CardFooter } from "@/components/ui/card";
import data from "@/data.json";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";
const LatestStoryBanner = () => {
  return (
    <Card className="flex flex-col gap-2">
      <Link
        href={`/${data[0].category}/${data[0].id}/${data[0].title.replaceAll(
          " ",
          "-"
        )}`}
      >
        <Image
          src={data[0].image}
          alt={`${data[0].title}`}
          height={240}
          className="w-full h-full object-cover rounded-xl"
          width={240}
        />
      </Link>
      <Link
        href={`/${data[0].category}/${data[0].id}/${data[0].title.replaceAll(
          " ",
          "-"
        )}`}
      >
        <h2 className="font-bold">{data[0].title}</h2>
      </Link>
      <CardFooter className="text-xs flex gap-2">
        <span>{data[0].category}</span>
        <Separator className="bg-gray-400 h-4 w-0.5" />
        <span>{data[0].date}</span>
      </CardFooter>
    </Card>
  );
};

export default LatestStoryBanner;
