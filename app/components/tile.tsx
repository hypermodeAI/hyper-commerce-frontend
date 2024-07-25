import Image from "next/image";

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
    };
  };
}) {
  return (
    <div className="relative group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-stone-700 hover:border-indigo-500 bg-black">
      <Image
        alt={product?.product?.name}
        src={product?.product?.image}
        layout="fill"
        objectFit="cover"
        className="absolute"
      />
      <div className="bg-black flex items-center justify-between absolute bottom-0 left-0 mb-6 ml-6 border border-white/40 text-sm font-semibold rounded-full p-1 w-2/3 overflow-hidden">
        <div className="px-2 truncate">{product?.product?.name}</div>
        <div className="bg-indigo-500 rounded-full p-1 px-2">
          <span>$</span>
          {product?.product?.price}
        </div>
      </div>
    </div>
  );
}
