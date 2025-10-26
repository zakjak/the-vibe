import AllSports from "@/components/AllSports";

const SportsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div>
      <AllSports page={page as string} />
    </div>
  );
};

export default SportsPage;
