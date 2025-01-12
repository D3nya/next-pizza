import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Calc total price for pizza
 * Total price = pizza price(type, size) + ingredients price(ingredients)
 * @param type - pizza type
 * @param size - pizza size
 * @param productItems - variation
 * @param ingredients - ingredients
 * @param selectedIngredients - selected ingredients
 *
 * @returns total price
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  productItems: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
): number => {
  const pizzaPrice = productItems.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
