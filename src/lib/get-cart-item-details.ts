import { mapPizzaType, PizzaSize, PizzaType, ProductQuantityValue } from "../constants/products";
import { CartStateItem } from "./get-cart-details";
import { quantityDetails } from "./get-product-details";

function detailText(quantity: ProductQuantityValue): string {
  return quantityDetails[quantity] || "Неизвестное количество";
}

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
  quantity?: ProductQuantityValue,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${pizzaSize} см, ${typeName.toLocaleLowerCase()}`);
  }

  if (quantity) {
    details.push(detailText(quantity));
  }

  if (ingredients.length > 0) {
    details.push(" + ");
    details.push(...ingredients.map((ingredient) => `${ingredient.name.toLocaleLowerCase()}, `));
  }

  return details.join("");
};
