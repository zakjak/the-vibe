"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchTechnology = async (page: number) => {
  const res = await fetch(`/api/articles/technology?page=${page}`);
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
