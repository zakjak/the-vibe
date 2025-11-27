import WriterAbout from "@/components/WriterAbout";

const WriterProfile = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <WriterAbout profileId={id} />
    </div>
  );
};

export default WriterProfile;
