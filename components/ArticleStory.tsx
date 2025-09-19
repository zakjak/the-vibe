import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const ArticleStory = ({ sport }) => {
  return (
    <div className="col-span-2">
      <div className="lg:w-[40rem] md:w-[30rem]">
        <h1>{sport[0]?.title}</h1>
        <div className="flex items-center gap-1">
          <span>{calculateTime(sport[0]?.date)}</span>
          <Separator className="bg-gray-400 h-4 w-0.5" />
          <span>{sport[0]?.category}</span>
        </div>
        <Image
          src={sport[0]?.image}
          alt={`${sport[0]?.title}`}
          className="w-full h-full object-cover rounded-2xl"
          width={250}
          height={250}
        />
      </div>
      <div className="flex justify-between pt-6">
        <div className="">
          <h2>Image Source: {sport[0]?.imageCredit}</h2>
          <h2>Author: {sport[0]?.author}</h2>
        </div>
        <div>
          <span className="flex items-center">
            Share: <FaShareAlt />
          </span>
          <span className="flex items-center">
            Save: <FaSave />
          </span>
        </div>
      </div>
      <div className="pt-6">
        <article>{sport[0].story}</article>
      </div>
    </div>
  );
};

export default ArticleStory;
