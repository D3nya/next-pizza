"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import { useCartItems, useCartLoading, useCartTotal } from "@/store/cart";

import { Button } from "../ui/button";
import CartDrawer from "./cart-drawer";

type Props = {
  className?: string;
};

const CartButton: React.FC<Props> = ({ className }) => {
  const items = useCartItems();
  const totalAmount = useCartTotal();
  const loading = useCartLoading();

  return (
    <CartDrawer>
      {loading ? (
        <Button disabled className={cn("group relative w-[140px]", className)}>
          <Loader2 className="animate-spin" />
          Подождите
        </Button>
      ) : (
        <Button className={cn("group relative w-[140px]", className)}>
          <b>{totalAmount} ₽</b>
          <span className="h-full w-[1px] bg-white/30 mx-1" />
          <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
            <ShoppingCart size={16} className="relative" strokeWidth={2} />
            <b>{items.length}</b>
          </div>
          <ArrowRight
            size={20}
            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Button>
      )}
    </CartDrawer>
  );
};

export default CartButton;
