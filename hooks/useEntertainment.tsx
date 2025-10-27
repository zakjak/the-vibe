"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchEntertainment = async (page: number) => {
  const res = await fetch(`${apiUrl}/articles/entertainment?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useEntertainment = (page: number) => {
  return useQuery({
    queryKey: ["entertainment", page],
    queryFn: () => fetchEntertainment(page),
    placeholderData: keepPreviousData,
  });
};
