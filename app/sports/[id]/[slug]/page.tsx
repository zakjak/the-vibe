import ArticleComponent from "@/components/ArticleComponent";

const ArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return (
    <div className="grid md:grid-cols-3 p-10 gap-8">
      <ArticleComponent id={id} />
    </div>
  );
};

export default ArticlePage;
