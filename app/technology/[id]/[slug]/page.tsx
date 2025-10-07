import ArticleStory from "@/components/ArticleStory";
import RelatedArticles from "@/components/RelatedArticles";

const ArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const technology = await (
    await fetch(`http://localhost:3000/api/articles/article/${id}`)
  ).json();

  const relatedAritlces = await (
    await fetch(
      `http://localhost:3000/api/articles/category/${technology[0]?.category}`
    )
  ).json();

  return (
    <div className="grid md:grid-cols-3 p-10 gap-8">
      {/* Left Section */}
      <ArticleStory article={technology} />
      {/* Right Section */}
      <RelatedArticles relatedArticles={relatedAritlces} />
    </div>
  );
};

export default ArticlePage;
