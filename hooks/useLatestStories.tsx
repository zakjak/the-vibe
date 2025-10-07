"use client";

import { useQuery } from "@tanstack/react-query";

export const useLatestStories = () => {
  return useQuery({
    queryKey: ["latestArticles"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/articles");

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });
};
