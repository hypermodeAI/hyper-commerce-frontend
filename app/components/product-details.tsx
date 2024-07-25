import { getProduct } from "../actions";
import Image from "next/image";

export async function ProductDetails({ id }: { id: string }) {
  const response = await getProduct(id);
  const product = response?.data?.getProduct;
  return (
    <div className="rounded-lg bg-black border border-stone-700 p-6 w-full h-full md:h-[90vh] flex flex-col md:flex-row">
      <div className="md:w-3/5 h-full relative h-64 md:h-auto mb-2 md:mb-0">
        <Image
          alt={product.name}
          src={product.image}
          layout="fill"
          objectFit="cover"
          className="absolute rounded"
        />
      </div>
      <div className="md:w-2/5 pl-4 flex flex-col">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2">
          {product.name}
        </h1>
        <div className="rounded-full font-semibild bg-indigo-500 py-2 px-4 mr-auto text-lg mb-4 lg:mb-8">
          ${product.price}
        </div>
        <div className="mb-8 text-white/70">{product.description}</div>
        <button
          disabled={true}
          className="cursor-not-allowed opacity-60 w-full bg-indigo-500 p-2 rounded-full uppercase font-semibold"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
