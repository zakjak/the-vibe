import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." className="flex-1 w-full" />
      <Button variant="outline" className="cursor-pointer">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
