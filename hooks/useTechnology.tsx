"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchTechnology = async (page: number) => {
  const res = await fetch(`${apiUrl}/api/articles/technology?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useTechnology = (page: number) => {
  return useQuery({
    queryKey: ["technology", page],
    queryFn: () => fetchTechnology(page),
    placeholderData: keepPreviousData,
  });
};
