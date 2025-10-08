import Link from "next/link";
import React from "react";

const NavbarLargeLinks = ({ navLinks }) => {
  return (
    <div className="text-sm lg:flex gap-2 items-center hidden">
      {navLinks.map((link) => (
        <Link key={link.name} href={link.href}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLargeLinks;
