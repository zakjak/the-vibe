"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchInnovation = async (page: number) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/innovation?page=${page}`
  );
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
