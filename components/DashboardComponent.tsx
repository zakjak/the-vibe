"use client";

import {
  useFilterMessage,
  useMessage,
  useToggleStatus,
} from "@/hooks/useContact";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Message } from "@/lib/types/message";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { calculateTime } from "@/lib/utils/helpers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";
import { Badge } from "./ui/badge";
import StatsBoard from "./StatsBoard";
import DashBoardFilter from "./DashBoardFilter";
import { Skeleton } from "./ui/skeleton";

const DashboardComponent = () => {
  const [changeStatus, setChangeStatus] = useState("");
  const { mutate } = useToggleStatus(changeStatus);
  const [date, setDate] = useState("");

  const [status, setStatus] = useState("");

  const { data: initialData, isFetchingNextPage, fetchNextPage } = useMessage();
  const {
    data: filteredData,
    refetch: refetchFiltered,
    isRefetching,
  } = useFilterMessage(status, date);

  const messages = filteredData ?? initialData;

  const allMessages = messages?.pages?.flatMap((page) => page?.messages) ?? [];

  const isExisting =
    messages &&
    allMessages?.[allMessages.length - 1]?.id !==
      messages?.pages[0]?.lastMessage[0]?.id;

  const updateStatus = (val: string, id: number) => {
    setChangeStatus(val);

    mutate(id);
  };

  const badgeColor = (status: string) => {
    return status === "new"
      ? "text-blue-600 bg-blue-500/10"
      : status === "reviewing"
      ? "text-yellow-600 bg-yellow-500/10"
      : status === "needs_follow"
      ? "text-orange-600 bg-orange-500/10"
      : status === "achived"
      ? "text-gray-700 bg-gray-500/10"
      : status === "contacted"
      ? "text-purple-600 bg-purple-500/10"
      : status === "completed"
      ? "text-green-600 bg-green-500/10"
      : "";
  };

  const loadMessages = () => {
    fetchNextPage();
  };

  return (
    <div className="w-[80%] lg:max-w-[70rem] md:max-w-[50rem] mx-auto">
      <div className="h-[13rem] lg:h-[20rem] shadow-xl md:h-[15rem] w-full bg-linear-to-bl from-[#DBDCF3] to-blue-500 rounded-2xl flex flex-col items-center justify-center">
        <h1 className="lg:text-5xl md:text-4xl text-2xl text-black font-semibold">
          Admin Dashboard
        </h1>
        <h3 className="text-zinc-700">
          Messages of advertisement or sponsorship
        </h3>
      </div>
      <div className="grid md:grid-cols-5 mt-6 gap-4">
        <StatsBoard
          totalArchived={messages?.pages[0]?.totalArchived?.count}
          totalAwaiting={messages?.pages[0]?.totalAwaiting?.count}
          totalCompleted={messages?.pages[0]?.totalCompleted?.count}
          totalContacted={messages?.pages[0]?.totalContacted?.count}
          totalMessages={messages?.pages[0]?.totalMessages?.count}
          totalNew={messages?.pages[0]?.totalNew?.count}
          totalReviewing={messages?.pages[0]?.totalReviewing?.count}
        />

        <DashBoardFilter
          date={date}
          setDate={setDate}
          setStatus={setStatus}
          status={status}
          refetchFiltered={refetchFiltered}
          isRefetching={isRefetching}
        />
      </div>

      <Table className="w-[30%] mt-6">
        <TableCaption>A list of your recent emails</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Name/Company</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead className="w-[100px]">Message</TableHead>
            <TableHead className="w-[100px] font-bold">Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allMessages?.map((message: Message) => (
            <TableRow key={message?.id}>
              <TableCell>
                <h2 className="font-semibold text-md flex">
                  {message?.title} {message?.contactName}
                </h2>
                <p>{message?.company}</p>
              </TableCell>
              <TableCell>{message?.email}</TableCell>
              <TableCell className="w-[100px]">
                {message?.message?.slice(0, 80)}
              </TableCell>
              <TableCell>{calculateTime(message?.date)}</TableCell>
              <TableCell>
                <Select
                  value={message?.status}
                  onValueChange={(value) => {
                    if (!message?.id) return;
                    updateStatus(value, message?.id);
                  }}
                >
                  <SelectTrigger className="border-none bg-transparent!">
                    <Badge
                      variant="outline"
                      className={`border-none tracking-wider! font-bold text-md ${badgeColor(
                        message?.status as string
                      )}`}
                    >
                      {message?.status?.toUpperCase()}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="awaiting client">
                        Awaiting Client
                      </SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="my-6 flex justify-center w-full">
        {isFetchingNextPage ? (
          <Skeleton />
        ) : isExisting ? (
          <div className=" flex items-center text-center justify-center">
            <Button
              onClick={loadMessages}
              className="cursor-pointer flex items-center text-sm font-semibold"
            >
              Show more <FaChevronDown />
            </Button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            {allMessages?.length ? "No More Messages" : "No Messages"}
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
