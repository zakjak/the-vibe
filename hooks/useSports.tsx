"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSports = async (page: number) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/sports?page=${page}`
  );
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
