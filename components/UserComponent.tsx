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
import { FaRegBookmark } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { User } from "@/lib/types/users";
import { usePathname, useRouter } from "next/navigation";
import { LuFilePenLine } from "react-icons/lu";
import { CiViewTable } from "react-icons/ci";

const UserComponent = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const data = session?.user as User;

  const handleSignIn = async () => {
    await signIn("google");
  };

  const handleSignOut = () => {
    signOut({
      redirect: false,
    });
    const isProfileRouter = pathname.startsWith("/profiles");

    if (!isProfileRouter) {
      router.push("/");
    }
  };

  return (
    <div>
      {session ? (
        <div className="flex flex-row font-semibold flex-wrap items-center gap-12">
          <Popover>
            <PopoverTrigger>
              <Avatar className="w-10 h-10 cursor-pointer">
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
                {data?.isAdmin && (
                  <>
                    <Link
                      href={`/profile/${session?.user?.id}/${slugify(
                        session?.user?.name as string
                      )}`}
                      className="flex items-center md:gap-2 gap-1 bg-blue-500 text-gray-100 hover:bg-blue-400 p-1 font-semibold rounded-sm py-2 px-1"
                    >
                      <CgProfile />
                      Profile
                    </Link>
                    <Link
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center md:gap-2 gap-1 p-1 font-semibold rounded-sm py-2 px-1"
                      href="/dashboard"
                    >
                      <CiViewTable />
                      Dashboard
                    </Link>
                    <Link
                      className="flex items-center md:gap-2 gap-1 bg-yellow-100 hover:bg-yellow-50 text-yellow-700 p-1 font-semibold rounded-sm py-2 px-1"
                      href={`/profile/${session?.user?.id}/draft`}
                    >
                      <LuFilePenLine />
                      Draft
                    </Link>
                  </>
                )}

                <Link
                  href="/saved"
                  className="flex items-center md:gap-2 gap-1 font-semibold cursor-pointer hover:bg-gray-200 hover:text-zinc-900 py-2 px-1 rounded-sm"
                >
                  <FaRegBookmark />
                  Saved
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center md:gap-2 gap-1 font-semibold cursor-pointer hover:bg-gray-200 hover:text-zinc-900 py-2 px-2 rounded-sm"
                >
                  <IoSettingsOutline />
                  Settings
                </Link>
                <Button onClick={handleSignOut}>Sign Out</Button>
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
