import { Select } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const DashBoardSkeleton = () => {
  const allMessages = [1, 2, 3, 4, 5];
  return (
    <div className="w-[80%] lg:max-w-280 md:max-w-200 mx-auto">
      <Skeleton className="h-52 lg:h-80 md:h-60 bg-linear-to-bl from-[#DBDCF3] to-blue-500 rounded-2xl" />
      <div className="grid md:grid-cols-5 mt-6 gap-4">
        <Skeleton className="col-span-3 bg-zinc-700 dark:bg-zinc-700 p-4 rounded-md h-52" />
        <Skeleton className="col-span-3 md:col-span-2 p-4 rounded-md h-52 bg-zinc-700 dark:bg-zinc-700 dark:shadow-zinc-800 flex flex-col gap-2" />
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
          {allMessages?.map((message) => (
            <TableRow key={message}>
              <TableCell className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24 bg-zinc-300" />
                <Skeleton className="h-4 w-32 bg-zinc-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-46 bg-zinc-300" />
              </TableCell>
              <TableCell className="w-[100px]">
                <Skeleton className="h-4 w-52 bg-zinc-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-15 bg-zinc-300" />
              </TableCell>
              <TableCell>
                <Select>
                  <Skeleton className="h-4 w-15 bg-zinc-300" />
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className="my-6 flex justify-center w-full">
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
      </div> */}
    </div>
  );
};

export default DashBoardSkeleton;
