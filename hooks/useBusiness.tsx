"use client";

import { useQuery } from "@tanstack/react-query";

export const useBusiness = () => {
  return useQuery({
    queryKey: ["business"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/articles/business");

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });
};
