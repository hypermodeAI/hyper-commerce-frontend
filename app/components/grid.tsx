import { searchProductWithLLM } from "../actions";
import { ProductTile } from "./tile";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
}: {
  item: { text: string; key: string };
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
        href={`/product/${item?.key}`}
      >
        <ProductTile product={item} />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const response = await searchProductWithLLM(
    "give me the highest rated products",
    3,
    1,
  );

  const topThreeProducts =
    response?.data?.searchProductWithLLM?.searchRes.objects || [];
  return (
    <section className="mx-auto grid w-full gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={topThreeProducts[0]} />
      <ThreeItemGridItem size="half" item={topThreeProducts[1]} />
      <ThreeItemGridItem size="half" item={topThreeProducts[2]} />
    </section>
  );
}
