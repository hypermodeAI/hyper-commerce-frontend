import { ProductTile } from "../components/tile";
import { searchProducts, searchProductWithLLM } from "../actions";
import { AdvancedSearch } from "../components/advanced-search";
import { Suspense } from "react";
import { TileSkeleton } from "../components/skeletons";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    ai: aiSearch,
    q: searchValue,
    rating: thresholdStars,
    itemsPerPage: maxItems,
  } = searchParams as {
    [key: string]: string;
  };

  // TODO: bug when toggling AI on/off when products are already listed
  const response = aiSearch
    ? await searchProductWithLLM(
        searchValue,
        parseInt(maxItems) || 9,
        parseInt(thresholdStars) || 0
      )
    : await searchProducts(
        searchValue,
        parseInt(maxItems) || 9,
        parseInt(thresholdStars) || 0
      );

  const products = aiSearch
    ? response?.data?.searchProductWithLLM?.searchRes.searchObjs
    : response?.data?.searchProducts?.searchObjs || [];
  return (
    <div className="px-4 flex space-x-4">
      <AdvancedSearch />
      <div className="w-full">
        <div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3 ">
          {products?.length > 0 ? (
            products.map(
              (
                item: {
                  product: {
                    description: string;
                    id: string;
                    name: string;
                    image: string;
                    price: string;
                    stars: number
                  };
                },
                i: number
              ) => (
                <div key={i} className="h-[40vh]">
                  <Suspense fallback={<TileSkeleton />}>
                    <ProductTile product={item} />
                  </Suspense>
                </div>
              )
            )
          ) : (
            <div>There are no products that match</div>
          )}
        </div>
      </div>
    </div>
  );
}
