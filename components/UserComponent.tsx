"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { nameFallback, slugify } from "@/lib/utils/helpers";

const UserComponent = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn("google");
  };
  console.log(session);

  return (
    <div>
      {session ? (
        <div className="flex flex-row font-semibold flex-wrap items-center gap-12">
          <Popover>
            <PopoverTrigger>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={`${session?.user?.image}`}
                  alt={`${session?.user?.name} profile`}
                />
                <AvatarFallback>
                  {nameFallback(session?.user?.name as string)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="z-[1000] mr-4">
              <div className="flex flex-col gap-2">
                <Link
                  href={`/profile/${session?.user?.id}/${slugify(
                    session?.user?.name as string
                  )}`}
                  className="bg-blue-500 text-gray-100 hover:bg-blue-400 p-1 font-semibold rounded-sm"
                >
                  Profile
                </Link>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={handleSignIn}>Sign in</Button>
      )}
    </div>
  );
};

export default UserComponent;
