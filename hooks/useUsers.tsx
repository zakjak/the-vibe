"use client";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchUsers = async () => {
  const res = await fetch(`${apiUrl}/api/users`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    placeholderData: keepPreviousData,
  });
};

const fetchAuthor = async (slug: string) => {
  const res = await fetch(`${apiUrl}/api/users/${slug}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useAuthor = (slug: string) => {
  return useQuery({
    queryKey: ["author", slug],
    queryFn: () => fetchAuthor(slug),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
};

const fetchAbout = async (id: string) => {
  const res = await fetch(`${apiUrl}/api/user/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useAbout = (id: string) => {
  return useQuery({
    queryKey: ["about-user", id],
    queryFn: () => fetchAbout(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};
