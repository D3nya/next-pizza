import React from "react";
import { ProductWithRelations } from "@/types/prisma";
import ChoosePizzaForm from "./choose-pizza-form";
import ChooseProductForm from "./choose-product-form";

type Props = {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
};

const ProductForm: React.FC<Props> = ({ product }) => {
  const firstItem = product.productItems[0];
  const isPizza = Boolean(firstItem.pizzaType);

  if (isPizza) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        productItems={product.productItems}
      />
    );
  }

  return <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} />;
};

export default ProductForm;
