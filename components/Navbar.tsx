import Link from "next/link";
import { Search } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import UserComponent from "./UserComponent";

const Navbar = () => {
  return (
    <nav className="h-14 flex items-center shadow-md">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="">
            <h1>
              <Link href="/">NewsAfrika</Link>
            </h1>
          </div>
          <Separator className="bg-gray-400 h-4 w-0.5" />
          <div className="text-sm flex gap-2 items-center">
            <Link href="/">Home</Link>
            <Link href="/politics">Politics</Link>
            <Link href="/sports ">Sports</Link>
            <Link href="/entertainment">Entertainment</Link>
            <Link href="/business">Business</Link>
            <Link href="/culture">Culture</Link>
            <Link href="/technology">Technology</Link>
            <Link href="/innovation">Innovation</Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <UserComponent />
          <Search />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
