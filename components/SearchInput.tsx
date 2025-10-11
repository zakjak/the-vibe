import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchSchema = z.object({
  search: z.string().min(1, {
    message: "Search query must contain at least 2 characers",
  }),
});

export type SearchFormValues = z.infer<typeof SearchSchema>;

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: SearchFormValues) => [onSearch(data.search)];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <Input
          {...register("search")}
          type="text"
          placeholder="Search..."
          className="flex-1 w-full"
        />
        <Button type="submit" variant="outline" className="cursor-pointer">
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchInput;
