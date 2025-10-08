"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import UserComponent from "./UserComponent";
import NavbarLargeLinks from "./NavbarLargeLinks";
import SearchInput from "./SearchInput";
import NavbarSmallLinks from "./NavbarSmallLinks";
import { useState } from "react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Politics",
      href: "/politics",
    },
    {
      name: "Sports",
      href: "/sports",
    },
    {
      name: "Entertainment",
      href: "/entertainment",
    },
    {
      name: "Business",
      href: "/business",
    },
    {
      name: "Culture",
      href: "/culture",
    },
    {
      name: "Technology",
      href: "/technology",
    },
    {
      name: "Innovation",
      href: "/innovation",
    },
  ];

  return (
    <nav className="sticky top-0 dark:bg-black dark:shadow bg-white">
      <section className="h-14 flex items-center shadow-md">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 flex-1">
            <div className="">
              <h1>
                <Link href="/">NewsAfrika</Link>
              </h1>
            </div>
            <Separator className="bg-gray-400 h-4 w-0.5 hidden lg:flex" />
            <div className="block lg:hidden w-full mx-2">
              <SearchInput />
            </div>
            <NavbarLargeLinks navLinks={navLinks} />
          </div>
          <div className="flex gap-4 items-center">
            <UserComponent />
            <Search
              className="hidden lg:block cursor-pointer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <ModeToggle />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center">
        <NavbarSmallLinks navLinks={navLinks} />
      </section>
      {isSearchOpen && (
        <section className="hidden lg:block w-[70%] mx-auto py-2">
          <SearchInput />
        </section>
      )}
    </nav>
  );
};

export default Navbar;
