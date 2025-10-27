"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useSavedArticles = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["user-saved-articles", id],
    queryFn: ({ pageParam }) =>
      fetch(
        `${apiUrl}/articles/article/saved-articles/user-articles/${id}?page=${pageParam}`
      ).then((res) => res.json()),
    enabled: !!id,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};
