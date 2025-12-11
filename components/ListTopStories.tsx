import { Article } from "@/lib/types/article";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const ListTopStories = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      {articles?.map((story) => (
        <div key={story.id} className="flex flex-col gap-2 mt-2">
          <Separator className="h-0.5 w-full bg-gray-300" />
          <Link
            href={`/${story.category}/${story.id}/${story.title.replaceAll(
              " ",
              "-"
            )}`}
          >
            <h2 className="hover:underline text-sm">{story.title}</h2>
          </Link>
          <div className="flex gap-2 items-center text-zinc-400 text-[.7rem]">
            <span>{story?.category}</span>
            <Separator className="w-0.5 h-3 bg-zinc-400" />
            <span>{calculateTime(story.date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTopStories;
