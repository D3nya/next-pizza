"use client";

import React from "react";

import { useCartActions } from "@/store/cart";

const CartProvider: React.FC = () => {
  const { fetchCartItems } = useCartActions();

  React.useEffect(() => {
    fetchCartItems().catch((e) => console.log(e));
  }, [fetchCartItems]);

  return null;
};

export default CartProvider;
