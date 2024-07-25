"use client";

import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ReadonlyURLSearchParams } from "next/navigation";
import { clsx } from "clsx";

const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { replace } = useRouter();
  const pathname = usePathname();
  let aiEnabled = false;
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
      router.push(createUrl("/search", params));
    } else {
      router.push("/");
    }
  }, 200);

  const aiSearchToggle = () => {
    const params = new URLSearchParams(searchParams);

    if (params.get("ai") === "true") {
      params.delete("ai");
    } else {
      params.set("ai", "true");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  aiEnabled = searchParams.get("ai") === "true";

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-stone-700 py-[9px] pl-14 text-sm outline-2 placeholder:text-gray-500 bg-black"
        placeholder="Search"
        defaultValue={searchParams?.get("q") || ""}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-6 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <button
        onClick={aiSearchToggle}
        title={
          aiEnabled
            ? "Turn off advanced search with AI"
            : "Enable advanced search with AI"
        }
        className={clsx(
          "rounded-full flex-none flex items-center justify-center absolute right-6 top-1/2 h-7 w-7 -translate-y-1/2",
          aiEnabled ? "bg-indigo-500 text-white" : "text-white/70",
        )}
      >
        <SparklesIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
