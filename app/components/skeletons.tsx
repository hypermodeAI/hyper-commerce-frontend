import { PhotoIcon } from "@heroicons/react/24/outline";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-white/20 before:via-stone-100 before:to-transparent";

export function TileSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-black p-2 shadow-sm w-full h-full border border-stone-800 flex items-center justify-center`}
    >
      <div className="text-white/40 w-1/5 flex flex-col justify-center items-center">
        <PhotoIcon />
      </div>
      <div className="flex items-center absolute bottom-0 left-0 mb-8 ml-8 border border-white/40 text-sm font-semibold rounded-full p-1 w-2/3 overflow-hidden">
        <div className="px-2 truncate w-40 h-7"></div>
        <div className="bg-stone-800 rounded-full p-1 px-2 w-20 h-7"></div>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3 ">
      <TileSkeleton />
      <TileSkeleton />
      <TileSkeleton />
      <TileSkeleton />
      <TileSkeleton />
      <TileSkeleton />
    </div>
  );
}
