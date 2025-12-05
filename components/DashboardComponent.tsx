"use client";

import { useMessage } from "@/hooks/useContact";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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

const DashboardComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data } = useMessage(pageNumber);

  const handleShowMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  return (
    <div className="w-[80%]  mx-auto">
      <Table className="w-[30%] ">
        <TableCaption>A list of your recent emails</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Company</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead className="w-[100px]">Website</TableHead>
            <TableHead className="w-[100px]">Industry</TableHead>
            <TableHead className="w-[100px]">Message</TableHead>
            <TableHead className="w-[100px]">Address</TableHead>
            <TableHead className="w-[100px]">Phone</TableHead>
            <TableHead className="w-[100px]">Country</TableHead>
            <TableHead className="w-[100px]">State</TableHead>
            <TableHead className="w-[100px]">city</TableHead>
            <TableHead className="w-[100px]">Zipcode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.messages?.map((message: Message, index: number) => (
            <TableRow key={message?.id}>
              <TableCell>{message?.name}</TableCell>
              <TableCell>{message?.company}</TableCell>
              <TableCell>{message?.email}</TableCell>
              <TableCell>{message?.website}</TableCell>
              <TableCell>{message?.industry}</TableCell>

              <TableCell className="w-[100px]">{message?.message}</TableCell>

              <TableCell>{message?.address}</TableCell>
              <TableCell>{message?.phone}</TableCell>
              <TableCell>{message?.country}</TableCell>
              <TableCell>{message?.state}</TableCell>
              <TableCell>{message?.city}</TableCell>
              <TableCell>{message?.zipCode}</TableCell>
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
