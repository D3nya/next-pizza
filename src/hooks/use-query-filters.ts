import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  const pizzaTypesString = Array.from(filters.pizzaTypes).join(",");
  const sizesString = Array.from(filters.pizzaSizes).join(",");
  const ingredientsString = Array.from(filters.selectedIngredients).join(",");

  useEffect(() => {
    if (isMounted.current) {
      const searchParams = new URLSearchParams();

      // Set priceFrom
      if (filters.prices.priceFrom !== undefined) {
        searchParams.set("priceFrom", filters.prices.priceFrom.toString());
      }

      // Set priceTo
      if (filters.prices.priceTo !== undefined) {
        searchParams.set("priceTo", filters.prices.priceTo.toString());
      }

      // Set pizzaTypes
      if (filters.pizzaTypes.size > 0) {
        searchParams.set("pizzaTypes", pizzaTypesString);
      }

      // Set sizes
      if (filters.pizzaSizes.size > 0) {
        searchParams.set("pizzaSizes", sizesString);
      }

      // Set ingredients
      if (filters.selectedIngredients.size > 0) {
        searchParams.set("ingredients", ingredientsString);
      }

      // Query string
      const queryString = searchParams.toString();

      router.push(`?${queryString}`, { scroll: false });
    }

    isMounted.current = true;
  }, [filters, ingredientsString, pizzaTypesString, router, sizesString]);
};
