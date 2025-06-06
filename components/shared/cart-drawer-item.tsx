import { Trash2Icon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CountButton } from "./count-button";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  totalCount,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex gap-6 bg-white p-5 dark:bg-gray-900",
        {
          "pointer-events-none opacity-50": disabled,
        },
        className,
      )}
    >
      <CartItemDetailsImage src={imageUrl} />

      <div className="flex-1">
        <CartItemInfo name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={totalCount} />

          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
