"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSearch = async (q: string, page: number) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/search?q=${q}&page=${page}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useSearch = (q: string, page: number) => {
  return useQuery({
    queryKey: ["search", q, page],
    queryFn: () => fetchSearch(q, page),
    placeholderData: keepPreviousData,
  });
};
