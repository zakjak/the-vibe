"use client";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data: article } = useArticle(id);
  console.log(article);
  const { data: relatedArticles } = useRelatedArticles(
    article && article[0].category
  );

  return (
    <div className="grid md:grid-cols-3 p-10 gap-8">
      {/* Left Section */}
      {article && <ArticleStory article={article[0]} />}
      {/* Right Section */}
      <RelatedArticles articles={relatedArticles} />
    </div>
  );
};

export default ArticleComponent;
