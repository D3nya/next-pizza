import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  pizzaSizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setPizzaSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

const getSetFromQueryParam = (searchParams: URLSearchParams, key: string): Set<string> => {
  const param = searchParams.get(key);
  return new Set(param ? param.split(",") : []);
};

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    getSetFromQueryParam(searchParams, "ingredients"),
  );

  const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(getSetFromQueryParam(searchParams, "pizzaSizes"));

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
      pizzaSizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPizzaSizes: togglePizzaSizes,
      setPizzaTypes: togglePizzaTypes,
      setSelectedIngredients: toggleIngredients,
      setPrices: updatePrice,
    }),
    [pizzaSizes, pizzaTypes, selectedIngredients, prices, togglePizzaSizes, togglePizzaTypes, toggleIngredients],
  );
};
