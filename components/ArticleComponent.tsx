"use client";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data, isFetching } = useArticle(id);

  const { data: relatedArticles } = useRelatedArticles(
    data && data?.category,
    id
  );

  if (isFetching) {
    return <ArticleComponentSkeleton />;
  }

  return (
    <>
      <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mx-auto max-w-[80%] lg:w-[60rem]">
        {/* Left Section */}
        {data && <ArticleStory article={data} />}

        {/* Right Section */}
        {/* {data && <RelatedArticles articles={relatedArticles} />} */}
      </div>
    </>
  );
};

export default ArticleComponent;
