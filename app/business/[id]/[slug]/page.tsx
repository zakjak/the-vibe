import ArticleComponent from "@/components/ArticleComponent";

const BusinessPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  return (
    <div className="">
      <ArticleComponent id={id} />
    </div>
  );
};

export default BusinessPage;
