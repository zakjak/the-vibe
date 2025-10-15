"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

const fetchSavedArticles = async ({
  id,
  pageParam,
}: {
  id: string;
  pageParam: number;
}) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/article/saved-articles/user-articles/${id}?page=${pageParam}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useSavedArticles = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["user-saved-articles", id],
    queryFn: fetchSavedArticles,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firsPage, pages) => firsPage.prevCursor,
  });
};
