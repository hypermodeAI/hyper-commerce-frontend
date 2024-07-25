import { Suspense } from "react";
import { searchProductWithLLM } from "../actions";
import { TileSkeleton } from "./skeletons";
import { ProductTile } from "./tile";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
}: {
  item: {
    product: {
      description: string;
      id: string;
      name: string;
      image: string;
      price: string;
      stars: number;
    };
  };
  size: "full" | "half";
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item?.product?.name}`}
      >
        <Suspense fallback={<TileSkeleton />}>
          <ProductTile product={item} />
        </Suspense>
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const response = await searchProductWithLLM(
    "stuffed animals",
    3,
    1,
  );

  const topThreeProducts =
    response?.data?.searchProductWithLLM?.searchRes.searchObjs || [];
  return (
    <section className="mx-auto grid w-full gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 max-h-[90vh]">
      <ThreeItemGridItem size="full" item={topThreeProducts[0]} />
      <ThreeItemGridItem size="half" item={topThreeProducts[1]} />
      <ThreeItemGridItem size="half" item={topThreeProducts[2]} />
    </section>
  );
}
