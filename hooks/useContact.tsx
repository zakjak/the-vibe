import { Message } from "@/lib/types/message";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchMessages = async (limit: number) => {
  const res = await fetch(`api/dashboard?limit=${limit}&offset=${limit - 5}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useMessage = () => {
  return useInfiniteQuery({
    queryKey: ["dashboard"],
    queryFn: ({ pageParam }) => fetchMessages(pageParam),
    initialPageParam: 5,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : (allPages.length + 1) * 5;
    },
  });
};

export const useAddMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Message) => {
      const res = await fetch(`/api/dashboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
  });
};

const toggleStatus = async (messageId: number, status: string) => {
  const res = await fetch(
    `/api/dashboard?messageId=${messageId}&status=${status}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.json();
};

export const useToggleStatus = (status: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (messageId: number) => toggleStatus(messageId, status),

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
  });
};

export const useFilterMessage = (status: string, date: string) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ["dashboard"],
    queryFn: async ({ pageParam }) => {
      const url = `/api/dashboard?status=${status}&date_range=${date}&limit=${pageParam}&offset${
        pageParam - 5
      }`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch emails");

      return res.json();
    },
    initialPageParam: 5,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : (allPages.length + 1) * 5;
    },
  });
};

// export const useFetchFileredMessages = (
//   page: number,
//   date: string,
//   status: string
// ) => {
//   const queryClient = useQueryClient();

//   return useQuery({
//     queryKey: ["dashboard", page, date, status],
//     queryFn: () => fetchMessages(page, date, status),
//     placeholderData: keepPreviousData,
//   });
// };
