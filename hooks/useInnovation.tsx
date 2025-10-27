"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchInnovation = async (page: number) => {
  const res = await fetch(`${apiUrl}/api/articles/innovation?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useInnovation = (page: number) => {
  return useQuery({
    queryKey: ["innovation", page],
    queryFn: () => fetchInnovation(page),
    placeholderData: keepPreviousData,
  });
};
