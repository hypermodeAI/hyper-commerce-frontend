import { searchProducts } from "../actions";
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
    ? await searchProducts(
        searchValue,
        parseInt(maxItems) || 9,
        parseInt(thresholdStars) || 0,
      )
    : await searchProducts(
        searchValue,
        parseInt(maxItems) || 9,
        parseInt(thresholdStars) || 0,
      );

  const products = response?.data?.searchProducts?.searchObjs || [];

  return (
    <div>
      {/* {aiSearch && response?.data ? (
        <div className="animate-popIn rounded-t rounded-br bg-indigo-500 text-white p-4 text-sm w-1/2 mb-4">
          {response?.data?.searchProducts?.llmObj?.userResponse}
        </div>
      ) : (
        <></>
      )} */}
      <div>
        {products?.length > 0 ? (
          <div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3 ">
            {products.map(
              (
                item: {
                  product: {
                    description: string;
                    id: string;
                    name: string;
                    image: string;
                    price: string;
                    stars: number;
                    isStocked: string;
                  };
                },
                i: number,
              ) => (
                <div key={i} className="h-[40vh]">
                  <ProductTile product={item?.product} />
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="py-4 w-full text-white/40 flex flex-col items-center justify-center">
            <div className="font-semibold text-2xl">
              No items matching your search
            </div>
            <div>
              Try searching again, such as: &quot;Halloween decorations&quot;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
