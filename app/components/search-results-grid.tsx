import { searchProducts, searchProductWithLLM } from "../actions";
import { ProductTile } from "./tile";

export async function SearchResultsGrid({
  aiSearch,
  searchValue,
  thresholdStars,
  maxItems,
}: {
  aiSearch: string;
  searchValue: string;
  thresholdStars: string;
  maxItems: string;
}) {
  // TODO: bug when toggling AI on/off when products are already listed
  const response = aiSearch
    ? await searchProductWithLLM(
        searchValue,
        parseInt(maxItems) || 9,
        parseInt(thresholdStars) || 0,
      )
    : await searchProducts(
        searchValue,
        parseInt(maxItems) || 9,
        parseInt(thresholdStars) || 0,
      );

  const products = aiSearch
    ? response?.data?.searchProductWithLLM?.searchRes.searchObjs
    : response?.data?.searchProducts?.searchObjs || [];

  return (
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
                stars: number;
              };
            },
            i: number,
          ) => (
            <div key={i} className="h-[40vh]">
              <ProductTile product={item} />
            </div>
          ),
        )
      ) : (
        <div>There are no products that match</div>
      )}
    </div>
  );
}
