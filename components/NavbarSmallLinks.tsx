import Link from "next/link";
import React from "react";

const NavbarSmallLinks = ({ navLinks }) => {
  return (
    <div className="text-sm flex justify-center lg:hidden bg-black text-white h-8">
      <div className="flex items-center justify-center ">
        <div className="w-[90%] flex gap-2 my-auto no-scrollbar overflow-x-auto">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarSmallLinks;
