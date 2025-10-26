import AllCulture from "@/components/AllCulture";

const CulturePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  return (
    <div>
      <AllCulture page={page as string} />
    </div>
  );
};

export default CulturePage;
