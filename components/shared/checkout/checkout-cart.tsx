import React from "react";

import { PizzaSize, PizzaType, ProductQuantityValue } from "@/constants/products";
import { CartStateItem } from "@/lib/get-cart-details";
import { getCartItemDetails } from "@/lib/get-cart-item-details";

import { CheckoutItem } from "../checkout-item";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { WhiteBlock } from "../white-block";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
  removeCartItem: (id: number) => Promise<void>;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, removeCartItem, loading, className }) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array<undefined>(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                  item.quantity as ProductQuantityValue,
                )}
                name={item.name}
                price={item.price}
                totalCount={item.totalCount}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.totalCount, type)}
                onClickRemove={() => void removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
