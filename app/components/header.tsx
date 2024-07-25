import Image from "next/image";
import Search from "./search";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { SearchInputSkeleton } from "./skeletons";

export default function Header() {
  return (
    <div className="flex items-center space-x-4 px-4">
      <Link href="/">
        <Image
          src="/logo-dark.svg"
          alt="hypermode logo"
          className="h-8"
          width={64}
          height={64}
        />
      </Link>
      <Suspense fallback={<SearchInputSkeleton />}>
        <Search />
      </Suspense>
      <button className="relative flex h-11 w-11 items-center justify-center rounded-md border transition-colors border-neutral-700 text-white">
        <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      </button>
    </div>
  );
}
