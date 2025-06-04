"use client";

import React from "react";
import { ProductWithRelations } from "@/types/prisma";
import ChoosePizzaForm from "./choose-pizza-form";
import ChooseProductForm from "./choose-product-form";

import { useToast } from "@/hooks/use-toast";
import { useCartActions, useCartLoading } from "@/store/cart";

type Props = {
  product: ProductWithRelations;
  full?: boolean;
  onSubmit?: VoidFunction;
};

const ProductForm: React.FC<Props> = ({ product, full, onSubmit }) => {
  const { addCartItem } = useCartActions();
  const loading = useCartLoading();
  const { toast } = useToast();

  const firstItem = product.productItems[0];
  const isPizza = Boolean(firstItem.pizzaType && firstItem.pizzaSize);

  const onSubmitForm = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast({
        title: product.name,
        description: "Товар успешно добавлен в корзину.",
      });

      onSubmit?.();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Ой-ой! Что-то пошло не так",
        description: "Не удалось добавить товар в корзину.",
      });
      console.error(err);
    }
  };

  if (isPizza) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        description={product.description}
        ingredients={product.ingredients}
        productItems={product.productItems}
        onSubmit={onSubmitForm}
        loading={loading}
        full={full}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      description={product.description}
      ingredients={product.ingredients}
      productItems={product.productItems}
      onSubmit={onSubmitForm}
      loading={loading}
      full={full}
    />
  );
};

export default ProductForm;
