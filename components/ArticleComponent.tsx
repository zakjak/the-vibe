"use client";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data: article, isFetching } = useArticle(id);
  const { data: relatedArticles } = useRelatedArticles(
    article && article[0]?.category
  );

  if (isFetching) {
    return <ArticleComponentSkeleton />;
  }

  return (
    <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mx-auto max-w-[80%]">
      {/* Left Section */}
      {article && <ArticleStory article={article[0]} />}
      {/* Right Section */}
      {article && <RelatedArticles articles={relatedArticles} />}
    </div>
  );
};

export default ArticleComponent;
