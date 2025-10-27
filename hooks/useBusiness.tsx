"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchBusiness = async (page: number) => {
  const res = await fetch(`${apiUrl}/articles/business?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useBusiness = (page: number) => {
  return useQuery({
    queryKey: ["business", page],
    queryFn: () => fetchBusiness(page),
    placeholderData: keepPreviousData,
  });
};
