import { ProductTile } from "../components/tile";
import { AdvancedSearch } from "../components/advanced-search";
import { Suspense } from "react";
import { SearchSkeleton } from "../components/skeletons";
import { SearchResultsGrid } from "../components/search-results-grid";

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
  return (
    <div className="px-4 flex space-x-4">
      <AdvancedSearch />
      <div className="w-full">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResultsGrid
            aiSearch={aiSearch}
            searchValue={searchValue}
            thresholdStars={thresholdStars}
            maxItems={maxItems}
          />
        </Suspense>
      </div>
    </div>
  );
}
