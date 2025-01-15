import { PizzaSize, PizzaType, ProductQuantityValue, mapPizzaType } from "../constants/products";
import { CartStateItem } from "./get-cart-details";

const quantityDetails: { [key: string]: string } = {
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

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
  quantity?: ProductQuantityValue
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
