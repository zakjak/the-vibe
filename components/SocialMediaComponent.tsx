import { SocialProps } from "@/lib/types/users";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const SocialMediaComponent = ({ data }: { data: SocialProps }) => {
  return (
    <div className="flex items-center gap-2 my-3">
      <h3>Follow:</h3>
      {data?.fb && (
        <Link href={data?.fb}>
          <FaFacebookF />
        </Link>
      )}

      {data?.twitter && (
        <Link href={data?.twitter}>
          <FaXTwitter />
        </Link>
      )}

      {data?.linkedIn && (
        <Link href={data?.linkedIn}>
          <FaLinkedinIn />
        </Link>
      )}
    </div>
  );
};

export default SocialMediaComponent;
