import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  cartItems: CartItemDTO[];
}

export type CreateCartItemValues = {
  productItemId: number;
  ingredients?: number[];
};
