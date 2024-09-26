"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    startTransition(() => {
      replace(pathname);
    });
  };

  return (
    <div className="col-span-12 md:col-span-5">
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <Input
            ref={inputRef}
            id="title"
            name="title"
            type="text"
            placeholder="Search"
            className={cn("pr-9", isPending && "opacity-75")}
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString() || ""}
            required
          />
          <div className="absolute right-0 top-1/2 translate-y-[-50%] mx-2.5 h-4 w-4 text-muted-foreground">
            {searchParams.get("query") ? (
              <Button
                size="icon"
                variant="ghost"
                onClick={clearSearch}
                className="w-auto h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            ) : (
              <SearchIcon className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
