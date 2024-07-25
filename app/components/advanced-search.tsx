"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { StarRating } from "./star-rating";

export function AdvancedSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const itemsPerPage = searchParams?.get("itemsPerPage") || "10";
  const handleItemsPerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("itemsPerPage", value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="w-64 space-y-2 text-stone-400">
      <div className="font-semibold border-b border-stone-600 pb-2">
        Advanced Search
      </div>
      <div className="text-xs">
        Showing results for{" "}
        <span className="font-bold">&quot;{searchParams?.get("q")}&quot;</span>
      </div>
      <div>
        <p className="uppercase text-sm">Customer Reviews</p>
        <div className="flex items-center space-x-2">
          <StarRating />
          <span className="text-sm">& up</span>
        </div>
      </div>
      <div>
        <p className="uppercase text-sm mb-2">Items per page</p>
        <div className="flex space-x-2">
          {["9", "12", "15"].map((value) => (
            <button
              key={value}
              className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                itemsPerPage === value.toString()
                  ? "bg-stone-600 text-white"
                  : "border-stone-600 text-stone-600"
              }`}
              onClick={() => handleItemsPerPageChange(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
