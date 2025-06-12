"use client";

import { X } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CartItemDetailsCountButton } from "./cart-item-details/cart-item-details-count-button";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { CartItemInfo } from "./cart-item-details/cart-item-info";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  totalCount,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "pointer-events-none opacity-50": disabled,
        },
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-5">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="ml-20 flex items-center gap-5">
        <CartItemDetailsCountButton onClick={onClickCountButton} value={totalCount} />
        <button type="button" onClick={onClickRemove}>
          <X className="cursor-pointer text-gray-400 hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
