"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchCulture = async (page: number) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/culture?page=${page}`
  );
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
