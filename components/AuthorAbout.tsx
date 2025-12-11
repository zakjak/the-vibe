"use client";

import { useAuthor } from "@/hooks/useUsers";
import Image from "next/image";

const AuthorAbout = ({ slug }: { slug: string }) => {
  const { data } = useAuthor(slug);

  return (
    <div className="grid md:grid-cols-2 w-[80%] mx-auto">
      {data && (
        <>
          <div className="w-full">
            <Image
              src={data[0]?.image}
              alt={`${data[0]?.name} profile`}
              height={240}
              width={240}
              className="w-full lg:h-80 object-cover "
            />
          </div>
          <div className="">
            <h1>{data[0]?.name}</h1>
            <span>{data[0]?.position}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorAbout;
