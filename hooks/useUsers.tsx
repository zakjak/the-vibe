"use client";

import { UserInfo } from "@/lib/types/users";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await fetch(`/api/users`);
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
  const res = await fetch(`/api/users/${slug}`);
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
  const res = await fetch(`/api/user/${id}`);
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

const fetchWriter = async (id: string) => {
  const res = await fetch(`/api/user/profile/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useUserWriter = (id: string) => {
  return useQuery({
    queryKey: ["about-writer", id],
    queryFn: () => fetchWriter(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

const updateUser = async ({
  userId,
  userInfo,
}: {
  userId: string;
  userInfo: UserInfo;
}) => {
  await fetch(`/api/user/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      position: userInfo.position,
      bio: userInfo.bio,
      twitter: userInfo.twitter,
      fb: userInfo.fb,
      linkedIn: userInfo.linkedIn,
    }),
  });
};

export const useUpdateUserProfile = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo: UserInfo) => updateUser({ userId, userInfo }),

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["about-user", userId] }),
  });
};

export const useProfiles = ({ isLeader }: { isLeader?: boolean } = {}) => {
  return useInfiniteQuery({
    queryKey: ["profiles", isLeader],
    queryFn: ({ pageParam }) =>
      fetch(`/api/profiles?page=${pageParam}&isLeader=${isLeader}`).then(
        (res) => res.json()
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};
