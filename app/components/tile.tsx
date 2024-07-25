import Image from "next/image";
import Link from "next/link";
import StarRating from "./product-rating";

export async function ProductTile({
  product,
}: {
  product: {
    product: {
      description: string;
      id: string;
      image: string;
      name: string;
      price: string;
      stars: number;
      isStocked: string;
    }

  };
}) {

  return (
    <div className="flex items-center justify-center relative group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-stone-700 hover:border-indigo-500 bg-white">
      <Link href={`/product/${product?.product?.id}`}>
        <div className="absolute top-4 right-4">
          <StarRating rating={product?.product?.stars} color="black" />
          <div className="text-xs text-black text-right font-semibold">
            {!product?.product?.isStocked ? <div>Out of Stock</div> : <div></div>}
          </div>
        </div>
        <Image
          alt={product?.product?.name}
          src={product?.product?.image}
          width="150"
          height="150"
        />
        <div className="bg-black flex items-center justify-between absolute bottom-0 left-0 mb-6 ml-6 border border-white/40 text-sm font-semibold rounded-full p-1 w-2/3 overflow-hidden">
          <div className="px-2 truncate">{product?.product?.name}</div>
          <div className="bg-indigo-500 rounded-full p-1 px-2">
            <span>$</span>
            {product?.product?.price}
          </div>
        </div>
      </Link>
    </div>
  );
}
