"use client";

import { CommentFormValues } from "@/components/CommentSection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CommentProps = {
  comment: string;
  postId: number;
  ownerId: string;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CommentProps) => {
      const res = await fetch("http://localhost:3000/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetch(`http://localhost:3000/api/comment/${id}`, {
        method: "DELETE",
      }).then((data) => data.json()),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};
