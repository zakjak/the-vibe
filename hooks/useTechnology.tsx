"use client";

import { useQuery } from "@tanstack/react-query";

export const useTechnology = () => {
  return useQuery({
    queryKey: ["technology"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/articles/technology");

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });
};
