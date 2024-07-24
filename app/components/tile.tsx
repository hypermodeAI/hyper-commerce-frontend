import { getProduct } from "../actions";
import { PhotoIcon } from "@heroicons/react/24/outline";

export async function ProductTile({
  product,
}: {
  product: { text: string; key: string };
}) {
  const response = await getProduct(product?.key);
  return (
    <div className="relative group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border hover:border-indigo-500 bg-black">
      <div className="text-white/40 w-1/5 flex flex-col justify-center items-center">
        <PhotoIcon />
        <p className="text-nowrap">No photo available</p>
      </div>
      <div className="flex items-center absolute bottom-0 left-0 mb-8 ml-8 border border-white/40 text-sm font-semibold rounded-full p-1 w-2/3 overflow-hidden">
        <div className="px-2 truncate">{product?.text}</div>
        <div className="bg-indigo-500 rounded-full p-1 px-2">$10.00</div>
      </div>
    </div>
  );
}
