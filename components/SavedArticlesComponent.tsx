import { useSavedArticles } from "@/hooks/useSavedArticles";
import { Article } from "@/lib/types/article";
import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { Clock } from "lucide-react";
import { calculateTime } from "@/lib/utils/helpers";
import { Separator } from "@radix-ui/react-separator";
import PaginationComponent from "./PaginationComponent";
import TopCategoryStory from "./TopCategoryStory";
import { InView, useInView } from "react-intersection-observer";

const SavedArticlesComponent = ({ userId }: { userId: string }) => {
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const { data } = useSavedArticles(userId);

  console.log(data);

  //   const { countRows, pageNumber, userSavedArticles: savedArticles } = data;

  return (
    <InView
      as="div"
      onChange={(inView, entry) => console.log("Inview", inView)}
    >
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4"
      >
        {/* {savedArticles?.map(({ articles }: { articles: Article }) => (
          <TopCategoryStory key={articles.id} topStory={articles} />
        ))} */}
      </div>
    </InView>
  );
};

{
  /* <div className="mt-8">
        {data?.pageNumber > 1 && (
          <PaginationComponent pageNumber={data?.pageNumber} />
        )}
      </div> */
}

export default SavedArticlesComponent;
