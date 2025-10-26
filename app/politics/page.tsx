import AllPolitics from "@/components/AllPolitics";

const PoliticsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div className="mb-4">
      <AllPolitics page={page as string} />
    </div>
  );
};

export default PoliticsPage;
