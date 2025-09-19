import ArticleStory from "@/components/ArticleStory";
import RelatedArticles from "@/components/RelatedArticles";

const ArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const sport = await (
    await fetch(`http://localhost:3000/api/articles/article/${id}`)
  ).json();

  const relatedAritlces = await (
    await fetch(
      `http://localhost:3000/api/articles/category/${sport[0]?.category}`
    )
  ).json();

  return (
    <div className="grid grid-cols-3 p-10 gap-10">
      {/* Left Section */}
      <ArticleStory sport={sport} />
      {/* Right Section */}
      <RelatedArticles relatedArticles={relatedAritlces} />
    </div>
  );
};

export default ArticlePage;
