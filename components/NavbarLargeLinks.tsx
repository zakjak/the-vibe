import Link from "next/link";
import React from "react";

type NavLink = {
  name: "";
  href: "";
};

type NavbarLargeLinksProps = {
  navLinks: NavLink[];
};

const NavbarLargeLinks = ({ navLinks }: NavbarLargeLinksProps) => {
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
