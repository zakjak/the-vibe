"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import UserComponent from "./UserComponent";
import NavbarLargeLinks from "./NavbarLargeLinks";
import SearchInput from "./SearchInput";
import NavbarSmallLinks from "./NavbarSmallLinks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = Number(params.get("page")) || 1;
    setPage(currentPage);
  }, []);

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

  const handleSearch = (data: string) => {
    router.push(`/search?q=${data.split(" ").join("+")}&page=${page}`);
  };

  return (
    <nav className="sticky top-0 dark:bg-black dark:shadow bg-white z-[999]">
      <section className="h-14 flex items-center shadow-md">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 flex-1">
            <div className="">
              <h1 className="hidden md:block font-bold text-lg">
                <Link href="/">TheVybeNews</Link>
              </h1>
              <h1 className="block md:hidden font-bold text-lg">
                <Link href="/">TheVybe</Link>
              </h1>
            </div>
            <Separator className="bg-gray-400 h-4 w-0.5 hidden lg:flex" />
            <NavbarLargeLinks navLinks={navLinks as []} />
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
      <section className="flex items-center justify-center w-full">
        <NavbarSmallLinks navLinks={navLinks as []} />
      </section>
      <section className="w-[90%] mx-auto py-2 lg:hidden block">
        <SearchInput onSearch={handleSearch} />
      </section>
      {isSearchOpen && (
        <section className="hidden lg:block w-[70%] mx-auto py-2">
          <SearchInput onSearch={handleSearch} />
        </section>
      )}
    </nav>
  );
};

export default Navbar;
