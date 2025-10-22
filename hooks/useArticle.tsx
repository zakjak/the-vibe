"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchArticle = async (id: number, page: number) => {
  // await fetch(`http://localhost:3000/api/articles/article/${id}`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // });

  const res = await fetch(
    `http://localhost:3000/api/articles/article/${id}?page=${page}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useArticle = (id: number, page: number) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id!, page),
    select: (data) => data.article[0],
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

export const useComments = (id: number, page: number) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchArticle(id, page).then((data) => data.articleComments),
  });
};

export const useAddMoreComments = (id: number) => {
  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetch(
        `http://localhost:3000/api/articles/article/${id}?page=${pageParam}`
      ).then((res) => res.json()),
    select: (data) =>
      data?.pages?.map((comment) => ({
        comments: comment.articleComments,
        lastComment: comment.lastComment,
      })),
    enabled: !!id,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
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
