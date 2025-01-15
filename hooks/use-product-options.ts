import { useState } from "react";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { ProductQuantityValue } from "@/constants/products";

type ReturnProps = {
  quantity: ProductQuantityValue;
  setQuantity: (quantity: ProductQuantityValue) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  currentItemId?: number;
};

export const useProductOptions = (items: ProductItem[]): ReturnProps => {
  const [quantity, setQuantity] = useState<ProductQuantityValue>(items[0].quantity as ProductQuantityValue);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const currentItemId = items.find((item) => item.quantity === quantity)?.id;

  return {
    quantity,
    setQuantity,
    selectedIngredients,
    addIngredient,
    currentItemId,
  };
};
