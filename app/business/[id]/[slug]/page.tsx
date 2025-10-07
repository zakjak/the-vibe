import ArticleStory from "@/components/ArticleStory";
import RelatedArticles from "@/components/RelatedArticles";
import React from "react";

const BusinessPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const business = await (
    await fetch(`http://localhost:3000/api/articles/article/${id}`)
  ).json();

  const relatedAritlces = await (
    await fetch(
      `http://localhost:3000/api/articles/category/${business[0]?.category}`
    )
  ).json();

  return (
    <div className="grid grid-cols-3 p-10 gap-10">
      {/* Left Section */}
      <ArticleStory article={business} />
      {/* Right Section */}
      <RelatedArticles relatedArticles={relatedAritlces} />
    </div>
  );
};

export default BusinessPage;
