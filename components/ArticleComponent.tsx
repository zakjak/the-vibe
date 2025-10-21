"use client";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";
import Head from "next/head";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data, isFetching } = useArticle(id);

  console.log(data);

  console.log(data?.articleComments);

  // const article = data?.article[0];

  // const articleUrl =
  //   data &&
  //   `http://localhost:3000/${article?.category}/${
  //     data?.article[0]?.id
  //   }/${data?.article[0]?.title?.replaceAll(" ", "-")}`;
  // const { data: relatedArticles } = useRelatedArticles(
  //   data && article?.category
  // );

  // if (isFetching) {
  //   return <ArticleComponentSkeleton />;
  // }

  return (
    <>
      {/* <Head>
        <title>{article?.title}</title>
        <meta name="description" content={article[0]?.title} />

        <meta property="og:title" content={article?.title} />
        <meta property="og:image" content={article?.image} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
      </Head> */}

      <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mx-auto max-w-[80%]">
        {/* Left Section */}
        {data && <ArticleStory article={data} />}
        {/* Right Section */}
        {/* {data && <RelatedArticles articles={relatedArticles} />} */}
      </div>
    </>
  );
};

export default ArticleComponent;
