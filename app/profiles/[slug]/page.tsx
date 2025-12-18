import ProfilesComponent from "@/components/ProfilesComponent";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

const ProfilesPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const profiles = [
    // {
    //   href: "/profiles/faces-of-thevybenews",
    //   name: "Faces of The Vybe News",
    // },
    {
      href: "/profiles/thevybenews-leadership",
      name: "Leadership",
    },
    {
      href: "/profiles",
      name: "A-Z",
    },
  ];

  return (
    <div>
      <div className="h-32 py-6 w-[80%] mx-auto">
        <h1 className="text-3xl font-semibold">The Vybe News Profiles</h1>
        <div className="flex items-center gap-1 mt-6">
          {profiles.map((profile) => (
            <div className="flex items-center gap-1">
              <Link
                href={profile.href}
                key={profile.name}
                className={`hover:underline ${
                  profile.href.includes(slug) ? "font-semibold" : ""
                }`}
              >
                {profile.name}
              </Link>
              {profile.name !== "A-Z" && (
                <Separator className="w-0.5 h-4 bg-zinc-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <ProfilesComponent slug={slug} />
    </div>
  );
};

export default ProfilesPage;
