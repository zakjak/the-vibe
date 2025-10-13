"use client";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

const fetchSavedArticle = async (id: number) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/article/saved-articles/${id}`
  );
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useSavedArticle = (articleId: number) => {
  return useQuery({
    queryKey: ["saved_article", articleId],
    queryFn: () => fetchSavedArticle(articleId),
    placeholderData: keepPreviousData,
  });
};

const toggleReadList = async ({
  ownerId,
  articleId,
}: {
  ownerId: string;
  articleId: number;
}) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/article/saved-articles/${articleId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerId, articleId }),
    }
  );

  return res.json();
};

type SavedArticle = {
  id: number;
  ownerId: string;
  articleId: number;
};

export const useToggleBookmark = (ownerId: string) => {
  return useMutation({
    mutationFn: (articleId: number) => toggleReadList({ articleId, ownerId }),
    onMutate: async (articleId, context) => {
      await context.client.cancelQueries({
        queryKey: ["saved_article", ownerId],
      });

      const previousArticles =
        context.client.getQueryData<SavedArticle[]>([
          "saved_article",
          ownerId,
        ]) || [];

      const isAlreadySaved = previousArticles.some(
        (a) => a.articleId === articleId
      );

      const newData = isAlreadySaved
        ? previousArticles.filter((a) => a.articleId !== articleId)
        : [...previousArticles, { id: Date.now(), ownerId, articleId }];

      context.client.setQueryData(["saved_article", ownerId], newData);

      return { previousArticles, newData };
    },

    onSuccess: (err, savedArticle, onMutateResult, context) => {
      // 🔄 Refetch the saved articles after toggle
      context.client.invalidateQueries({ queryKey: ["saved_article"] });
    },

    onError: (err, savedArticle, onMutateResult, context) => {
      context.client.setQueryData(
        ["saved_article", ownerId],
        onMutateResult?.previousArticles
      );
    },

    onSettled: (savedArticle, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: ["saved_article", ownerId],
      }),
  });
};
