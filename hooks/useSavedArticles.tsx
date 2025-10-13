"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSavedArticles = async (id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/article/saved-articles/user-articles/${id}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useSavedArticles = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchSavedArticles(id),
    placeholderData: keepPreviousData,
  });
};
