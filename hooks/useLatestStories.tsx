"use client";

import { useQuery } from "@tanstack/react-query";

export const useLatestStories = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return useQuery({
    queryKey: ["latestArticles"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/articles`);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });
};
