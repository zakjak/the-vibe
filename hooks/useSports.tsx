"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchSports = async (page: number) => {
  const res = await fetch(`${apiUrl}/articles/sports?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useSports = (page: number) => {
  return useQuery({
    queryKey: ["sports", page],
    queryFn: () => fetchSports(page),
    placeholderData: keepPreviousData,
  });
};
