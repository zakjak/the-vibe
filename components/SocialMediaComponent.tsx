import { SocialProps } from "@/lib/types/users";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";

const SocialMediaComponent = ({ data }: { data: SocialProps }) => {
  return (
    <div className="flex items-center gap-2 my-3">
      <h3>Follow:</h3>
      {data?.fb && (
        <Link href={data?.fb}>
          <Button variant="outline" className="cursor-pointer">
            <FaFacebookF />
          </Button>
        </Link>
      )}

      {data?.twitter && (
        <Link href={data?.twitter}>
          <Button variant="outline" className="cursor-pointer">
            <FaXTwitter />
          </Button>
        </Link>
      )}

      {data?.linkedIn && (
        <Link href={data?.linkedIn}>
          <Button variant="outline" className="cursor-pointer">
            <FaLinkedinIn />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SocialMediaComponent;
