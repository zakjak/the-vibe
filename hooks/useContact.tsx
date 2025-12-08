import { Message } from "@/lib/types/message";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchMessages = async ({
  page = 1,
  date = "all_time",
  status = "all",
}: {
  page?: number;
  date?: string;
  status?: string;
}) => {
  const params = new URLSearchParams();

  params.set("page", String(page));
  if (date) params.set("date_range", date);
  if (status) params.set("status", status);

  const res = await fetch(`api/dashboard?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useMessage = (page: number, date: string, status?: string) => {
  return useQuery({
    queryKey: ["dashboard", { page, date, status }],
    queryFn: () => fetchMessages({ page, date, status }),
    enabled: date || status ? false : true,
    placeholderData: keepPreviousData,
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
