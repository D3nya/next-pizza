export const mapPizzaSize = {
  25: "Маленькая",
  30: "Средняя",
  35: "Большая",
} as const;

export const mapPizzaType = {
  1: "Традиционная",
  2: "Тонкая",
} as const;

export const mapProductQuantity = {
  1: "0.3",
  2: "0.4",
  3: "0.5",
  4: "1",
  5: "2",
  6: "3",
  7: "4",
  8: "5",
  9: "Стандартная",
  10: "Большая",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value,
}));

export const ProductQuantities = Object.entries(mapProductQuantity).map(([value, name]) => ({
  name,
  value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
export type Quantity = keyof typeof mapProductQuantity;

type ValuesOf<T> = T[keyof T];
export type ProductQuantityValue = ValuesOf<typeof mapProductQuantity>;
