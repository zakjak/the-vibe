import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useMessage } from "@/hooks/useContact";
import { Spinner } from "./ui/spinner";

const DashBoardFilter = ({
  date,
  setDate,
  pageNumber,
  status,
  setStatus,
}: {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  pageNumber: number;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { refetch, isFetching } = useMessage(pageNumber, date, status);

  const onFilter = () => {
    refetch();
  };

  return (
    <div className="col-span-2 bg-white dark:bg-zinc-700 shadow-lg dark:shadow-zinc-800 p-4 rounded-md flex flex-col gap-2">
      <h1 className="tracking-wider font-medium text-xl mb-2">Filters</h1>
      <div className="flex flex-col gap-2">
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="border dark:border-zinc-200 border-zinc-400">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">None</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="awaiting_client">Awaiting Client</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={date} onValueChange={(value) => setDate(value)}>
          <SelectTrigger className="border dark:border-zinc-200 border-zinc-400">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="cursor-pointer"
        onClick={onFilter}
        disabled={isFetching}
      >
        {isFetching ? (
          <p className="flex items-center gap-2">
            Applying Filters <Spinner />
          </p>
        ) : (
          "Apply Filter"
        )}
      </Button>
    </div>
  );
};

export default DashBoardFilter;
