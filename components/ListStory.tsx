import { Article } from "@/lib/types/article";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const ListStory = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      {articles.map((story) => (
        <div key={story.id} className="flex flex-col gap-2 mt-4">
          <Separator className="h-0.5 w-full bg-gray-300" />
          <Link
            href={`/${story.category}/${story.id}/${story.title.replaceAll(
              " ",
              "-"
            )}`}
          >
            <h2 className="hover:underline text-[15px]">{story.title}</h2>
          </Link>
          <div className="flex items-center text-xs gap-2 text-zinc-400">
            <span className="font-bold tracking-wide">
              {story.category.toUpperCase()}
            </span>
            <Separator className="w-0.5 h-4 bg-zinc-400" />
            <span className="font-bold">{calculateTime(story.date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListStory;
