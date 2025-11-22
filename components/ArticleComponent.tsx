"use client";
// import { notFound } from "next/navigation";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data, isFetching } = useArticle(id);

  const { data: relatedArticles } = useRelatedArticles(
    data && data?.category,
    id
  );

  if (data?.error) {
    return notFound();
  }

  if (isFetching) {
    return <ArticleComponentSkeleton />;
  }

  return (
    <>
      <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mx-auto max-w-[80%] lg:w-[60rem]">
        {/* Left Section */}
        {data?.article && <ArticleStory articleStory={data} />}

        {/* Right Section */}
        {/* {data && <RelatedArticles articles={relatedArticles} />} */}
      </div>
    </>
  );
};

export default ArticleComponent;
