import { nameFallback } from "@/lib/utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import ArticleForm from "./ArticleForm";

const AboutUser = ({ session }) => {
  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <Avatar className="w-[4rem] h-[4rem]">
          <AvatarImage src={session?.user?.name as string} />
          <AvatarFallback className="font-bold">
            {session && <p>{nameFallback(session?.user?.name)}</p>}
          </AvatarFallback>
        </Avatar>
        <h1 className="font-semibold tracking-wider mt-2">
          {session?.user?.name}
        </h1>
      </div>
      <div className="mt-2 gap-2 flex">
        <Button variant="outline">Saved Articles</Button>
        <ArticleForm userInfo={session} />
      </div>
    </>
  );
};

export default AboutUser;
