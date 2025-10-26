import AllEntertainment from "@/components/AllEntertainment";

const EntertainmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  return (
    <div>
      <AllEntertainment page={page as string} />
    </div>
  );
};

export default EntertainmentPage;
