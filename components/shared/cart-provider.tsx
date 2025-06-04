"use client";

import { useCartActions } from "@/store/cart";
import React from "react";

const CartProvider: React.FC = () => {
  const { fetchCartItems } = useCartActions();

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return null;
};

export default CartProvider;
