import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="block lg:hidden w-full mx-2">
      <Input placeholder="Search..." className="flex-1 w-full" />
    </div>
  );
};

export default SearchInput;
