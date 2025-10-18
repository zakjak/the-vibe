"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchArticle = async (id: number) => {
  await fetch(`http://localhost:3000/api/articles/article/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const res = await fetch(`http://localhost:3000/api/articles/article/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useArticle = (id: number) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id!),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

const fetchRelatedArticle = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/category/${category}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useRelatedArticles = (category: string) => {
  return useQuery({
    queryKey: ["related-articles", category],
    queryFn: () => fetchRelatedArticle(category),
    placeholderData: keepPreviousData,
  });
};
