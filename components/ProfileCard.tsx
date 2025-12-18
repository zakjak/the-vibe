import { User } from "@/lib/types/users";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils/helpers";

type ProfileProp = {
  id: string;
};

const ProfileCard = ({ profile }: { profile: User }) => {
  return (
    <div className="w-full">
      <Link
        href={`/profiles/${slugify(profile?.name as string)}/${profile?.id}`}
        className=""
      >
        <div className="h-80 md:h-42">
          <Image
            src={profile?.image as string}
            alt={`${profile?.name} Profile image`}
            width={240}
            height={240}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </Link>
      <Link
        href={`/profiles/${slugify(profile?.name as string)}/${profile?.id}`}
        className=""
      >
        <h3>{profile?.name}</h3>
      </Link>
    </div>
  );
};

export default ProfileCard;
