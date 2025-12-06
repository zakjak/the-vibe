import { Message } from "@/lib/types/message";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchMessages = async (page: number) => {
  const res = await fetch(`/api/contact-us?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useMessage = (page: number) => {
  return useQuery({
    queryKey: ["contact-us", page],
    queryFn: () => fetchMessages(page),
    placeholderData: keepPreviousData,
  });
};

export const useAddMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Message) => {
      const res = await fetch(`/api/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["contact-us"] }),
  });
};

const toggleStatus = async (messageId: number, status: string) => {
  const res = await fetch(
    `/api/contact-us?messageId=${messageId}&status=${status}`,
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

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["contact-us"] }),
  });
};
