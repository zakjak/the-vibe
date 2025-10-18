"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export const useCreatedArticles = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["created-articles", id],
    queryFn: ({ pageParam }) =>
      fetch(
        `http://localhost:3000/api/articles/article/saved-articles/created-articles/${id}?page=${pageParam}`
      ).then((res) => res.json()),
    enabled: !!id,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};
