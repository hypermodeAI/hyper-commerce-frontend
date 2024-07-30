"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Logo() {
  const searchParams = useSearchParams();

  // Construct the URL with current search params
  const homeUrl =
    `/` + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  return (
    <Link href={homeUrl}>
      <div className="text-white flex items-center font-semibold text-xl italic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          className="fill-foreground"
          viewBox="0 0 130 124"
        >
          <g clip-path="url(#a)">
            <path
              fill="#fff"
              d="M90.2 0 76 55.5H39.5L53.7 0H14.2L0 55.5h32.3l-16.7 65.8 60.3-65.4-17.2 67.2h39.5L129.7 0z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h130v123.2H0z" />
            </clipPath>
          </defs>
        </svg>
        yper-toys
      </div>
    </Link>
  );
}
