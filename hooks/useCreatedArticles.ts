"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useCreatedArticles = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["created-articles"],
    queryFn: ({ pageParam }) =>
      fetch(
        `${apiUrl}/api/articles/article/saved-articles/created-articles/${id}?page=${pageParam}`
      ).then((res) => res.json()),
    enabled: !!id,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};
