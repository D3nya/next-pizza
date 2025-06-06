import { Ingredient, ProductItem } from "@prisma/client";

import { mapPizzaType, PizzaSize, PizzaType } from "../constants/products";
import { calcTotalPrice } from "./calc-total-price";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  productItems: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPrice(productItems, ingredients, selectedIngredients, { type, size });

  const textDetails = `${size} см, ${mapPizzaType[type].toLocaleLowerCase()} пицца, ${
    productItems.find((item) => item.pizzaType === type && item.pizzaSize === size)?.weight
  } г.`;

  return { totalPrice, textDetails };
};
