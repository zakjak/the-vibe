import AllBusiness from "@/components/AllBusiness";

const BusinessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div>
      <AllBusiness page={page as string} />
    </div>
  );
};

export default BusinessPage;
