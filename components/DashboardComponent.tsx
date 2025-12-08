"use client";

import { useMessage, useToggleStatus } from "@/hooks/useContact";

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
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import StatsBoard from "./StatsBoard";
import DashBoardFilter from "./DashBoardFilter";

const DashboardComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [changeStatus, setChangeStatus] = useState("");
  const { mutate } = useToggleStatus(changeStatus);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const { data } = useMessage(pageNumber, date, status);
  console.log(data);

  const handleShowMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const updateStatus = (val: string, id: number) => {
    console.log(val);
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

  return (
    <div className="w-[80%]  mx-auto">
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
          totalArchived={data?.totalArchived?.count}
          totalAwaiting={data?.totalAwaiting?.count}
          totalCompleted={data?.totalCompleted?.count}
          totalContacted={data?.totalContacted?.count}
          totalMessages={data?.totalMessages?.count}
          totalNew={data?.totalNew?.count}
          totalReviewing={data?.totalReviewing?.count}
        />

        <DashBoardFilter
          date={date}
          setDate={setDate}
          pageNumber={pageNumber}
          setStatus={setStatus}
          status={status}
        />
      </div>
      <div className="">{/* Search */}</div>

      <Table className="w-[30%] mt-6">
        <TableCaption>A list of your recent emails</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Company/Name</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead className="w-[100px]">Message</TableHead>
            <TableHead className="w-[100px] font-bold">Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.messages?.map((message: Message) => (
            <TableRow key={message?.id}>
              <TableCell>
                <h2 className="font-semibold text-md">
                  {message?.title} {message?.name}
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
      <div className="mt-8 flex justify-center w-full">
        {data?.pageNumber <= 1 && (
          <Button onClick={handleShowMore} className="cursor-pointer">
            Show more <FaChevronDown />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
