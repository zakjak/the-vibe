import AllInnovation from "@/components/AllInnovation";

const InnovationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div>
      <AllInnovation page={page as string} />
    </div>
  );
};

export default InnovationPage;
