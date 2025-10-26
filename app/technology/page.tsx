import AllTechnology from "@/components/AllTechnology";

const TechnologyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  return (
    <div>
      <AllTechnology page={page as string} />
    </div>
  );
};

export default TechnologyPage;
