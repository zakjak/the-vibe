import AllSearch from "@/components/AllSearch";
import { useSearch } from "@/hooks/useSearch";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q?: string; page?: number };
}) => {
  const { q, page } = await searchParams;

  return (
    <div>
      <AllSearch />
    </div>
  );
};

export default SearchPage;
