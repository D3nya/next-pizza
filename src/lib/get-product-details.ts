import { Ingredient, ProductItem } from "@prisma/client";

import { Variant } from "@/components/shared/group-variants";
import { ProductQuantityValue } from "@/constants/products";

import { calcTotalPrice } from "./calc-total-price";

export const quantityDetails: Record<string, string> = {
  Большая: "Большая",
  Стандартная: "Стандартная",
  "0.3": "0.3 л",
  "0.4": "0.4 л",
  "0.5": "0.5 л",
  "1": "1 шт",
  "2": "2 шт",
  "3": "3 шт",
  "4": "4 шт",
  "5": "5 шт",
};

function detailText(quantity: ProductQuantityValue): string {
  return quantityDetails[quantity] || "Неизвестное количество";
}

export const getProductDetails = (
  quantity: ProductQuantityValue,
  productItems: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
): { totalPrice: number; textDetails: string; availableQuantities: Variant[] } => {
  const totalPrice = calcTotalPrice(productItems, ingredients, selectedIngredients, { quantity });

  const detail = detailText(quantity);

  const item = productItems.find((item) => item.quantity === quantity);
  const weight = item ? item.weight : "не указано количество";

  const textDetails = `${detail}, ${weight} г.`;

  const availableQuantities = Array.from(
    new Set(
      productItems
        .map((productItem) => productItem.quantity)
        .filter((q): q is ProductQuantityValue => q !== null && q !== undefined),
    ),
  ).map((q) => ({
    name: detailText(q),
    value: q,
  }));

  return { totalPrice, textDetails, availableQuantities };
};
