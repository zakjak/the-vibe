"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchCulture = async (page: number) => {
  const res = await fetch(`${apiUrl}/api/articles/culture?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useCulture = (page: number) => {
  return useQuery({
    queryKey: ["culture", page],
    queryFn: () => fetchCulture(page),
    placeholderData: keepPreviousData,
  });
};
