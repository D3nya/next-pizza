import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType, ProductQuantityValue } from "../constants/products";

/**
 * Calc total price for products(snacks, pizzas and etc)
 * Total price = pizza price(type, size) OR product price(quantity) + ingredients price(ingredients)
 * @param productItems - variation
 * @param ingredients - ingredients
 * @param selectedIngredients - selected ingredients
 * @param product - oroduct info (size and type or quantity)
 *
 * @returns total price
 */
export const calcTotalPrice = (
  productItems: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  product: {
    type?: PizzaType;
    size?: PizzaSize;
    quantity?: ProductQuantityValue;
  }
): number => {
  let productPrice;

  if (productItems[0].pizzaSize) {
    productPrice =
      productItems.find((item) => item.pizzaType === product.type && item.pizzaSize === product.size)?.price || 0;
  } else {
    productPrice = productItems.find((item) => item.quantity === product.quantity)?.price || 0;
  }

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return productPrice + totalIngredientsPrice;
};
