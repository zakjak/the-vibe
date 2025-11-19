import ArticleComponent from "@/components/ArticleComponent";
import React from "react";

const ArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return (
    <div>
      <ArticleComponent id={id} />
    </div>
  );
};

export default ArticlePage;
