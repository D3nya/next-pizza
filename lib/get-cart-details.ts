import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export interface CartStateItem {
  id: number;
  totalCount: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  quantity?: string | null;
  ingredients: { name: string; price: number }[];
}

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.cartItems?.map((item) => ({
    id: item.id,
    totalCount: item.totalCount,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.pizzaSize,
    pizzaType: item.productItem.pizzaType,
    quantity: item.productItem.quantity,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
