import React from "react";

interface StatsProps {
  totalArchived: number;
  totalAwaiting: number;
  totalCompleted: number;
  totalContacted: number;
  totalMessages: number;
  totalNew: number;
  totalReviewing: number;
}

const StatsBoard = ({
  totalArchived,
  totalAwaiting,
  totalCompleted,
  totalContacted,
  totalMessages,
  totalNew,
  totalReviewing,
}: StatsProps) => {
  return (
    <div className="col-span-3 bg-white dark:bg-zinc-700 shadow-lg dark:shadow-zinc-800 p-4 rounded-md">
      <h1 className="tracking-wider font-medium text-xl mb-2">
        Status Overview
      </h1>
      <h2 className="text-lg">
        <span className="font-semibold">Total Emails:</span> {totalMessages}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="">
          <div className="flex justify-between py-1 border-b dark:border-zinc-400">
            <h4 className="font-medium tracking-wider text-md text-zinc-600 dark:text-zinc-100">
              New
            </h4>
            <span>{totalNew}</span>
          </div>
          <div className="flex justify-between py-1 border-b dark:border-zinc-400">
            <h4 className="font-medium tracking-wider text-md text-zinc-600 dark:text-zinc-100">
              Reviewing
            </h4>
            <span>{totalReviewing}</span>
          </div>
          <div className="flex justify-between py-1 border-b dark:border-zinc-400">
            <h4 className="font-medium tracking-wider text-md text-zinc-600 dark:text-zinc-100">
              Awaiting Client
            </h4>
            <span>{totalAwaiting}</span>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between py-1 border-b dark:border-zinc-400">
            <h4 className="font-medium tracking-wider text-md text-zinc-600 dark:text-zinc-100">
              Archived
            </h4>
            <span>{totalArchived}</span>
          </div>
          <div className="flex justify-between py-1 border-b dark:border-zinc-400">
            <h4 className="font-medium tracking-wider text-md text-zinc-600 dark:text-zinc-100">
              Contacted
            </h4>
            <span>{totalContacted}</span>
          </div>
          <div className="flex justify-between py-1 border-b dark:border-zinc-400">
            <h4 className="font-medium tracking-wider text-md text-zinc-600 dark:text-zinc-100">
              Completed
            </h4>
            <span>{totalCompleted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBoard;
