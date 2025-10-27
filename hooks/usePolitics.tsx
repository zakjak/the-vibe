"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchPolitics = async (page: number) => {
  const res = await fetch(`${apiUrl}/articles/politics?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const usePolitics = (page: number) => {
  return useQuery({
    queryKey: ["politics", page],
    queryFn: () => fetchPolitics(page),
    placeholderData: keepPreviousData,
  });
};
