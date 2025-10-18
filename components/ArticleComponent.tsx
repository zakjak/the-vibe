"use client";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";
import Head from "next/head";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data: article, isFetching } = useArticle(id);
  console.log(article);
  const articleUrl =
    article &&
    `http://localhost:3000/${article[0]?.category}/${
      article[0]?.id
    }/${article[0]?.title.replaceAll(" ", "-")}`;
  const { data: relatedArticles } = useRelatedArticles(
    article && article[0]?.category
  );

  if (isFetching) {
    return <ArticleComponentSkeleton />;
  }

  return (
    <>
      <Head>
        <title>{article[0]?.title}</title>
        <meta name="description" content={article[0]?.title} />

        <meta property="og:title" content={article[0]?.title} />
        <meta property="og:image" content={article[0]?.image} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mx-auto max-w-[80%]">
        {/* Left Section */}
        {article && <ArticleStory article={article[0]} />}
        {/* Right Section */}
        {article && <RelatedArticles articles={relatedArticles} />}
      </div>
    </>
  );
};

export default ArticleComponent;
