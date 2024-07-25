import { AdvancedSearch } from "../components/advanced-search";
import { Suspense } from "react";
import {
  SearchSkeleton,
  AdvancedSearchSkeleton,
} from "../components/skeletons";
import { SearchResultsGrid } from "../components/search-results-grid";
import { generateSearchObjectFromLLM } from "../actions";
import LLMResponse from "../components/llm-response-box";

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
      <div className="w-64 space-y-4 text-stone-400">
        <Suspense fallback={<AdvancedSearchSkeleton />}>
          <AdvancedSearch />
        </Suspense>
        {aiSearch ? (
          <Suspense fallback={<div>loading</div>}>
            <LLMResponse query={searchValue} />
          </Suspense>
        ) : (
          <></>
        )}
      </div>

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
