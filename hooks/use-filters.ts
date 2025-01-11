import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

export type Filters = {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
};

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

const getSetFromQueryParam = (searchParams: URLSearchParams, key: string): Set<string> => {
  const param = searchParams.get(key);
  return new Set(param ? param.split(",") : []);
};

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    getSetFromQueryParam(searchParams, "ingredients")
  );

  const [sizes, { toggle: toggleSizes }] = useSet(getSetFromQueryParam(searchParams, "sizes"));

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(getSetFromQueryParam(searchParams, "pizzaTypes"));

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setSizes: toggleSizes,
      setPizzaTypes: togglePizzaTypes,
      setSelectedIngredients: toggleIngredients,
      setPrices: updatePrice,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices, toggleSizes, togglePizzaTypes, toggleIngredients]
  );
};
