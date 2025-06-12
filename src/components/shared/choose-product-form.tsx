import { Ingredient, ProductItem } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React from "react";

import { ProductQuantityValue } from "@/constants/products";
import { useProductOptions } from "@/hooks/use-product-options";
import { getProductDetails } from "@/lib/get-product-details";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import GroupVariants from "./group-variants";
import IngredientVariants from "./ingredient-variants";
import ProductImage from "./product-image";
import Title from "./title";

interface Props {
  imageUrl: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  productItems: ProductItem[];
  className?: string;
  onSubmit: (itemId: number, ingredients: number[]) => Promise<void>;
  loading?: boolean;
  full?: boolean;
}

const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  className,
  description,
  ingredients,
  productItems,
  onSubmit,
  loading,
  full,
}) => {
  const { quantity, setQuantity, addIngredient, selectedIngredients, currentItemId } = useProductOptions(productItems);

  const { totalPrice, textDetails, availableQuantities } = getProductDetails(
    quantity,
    productItems,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = async () => {
    if (currentItemId) {
      try {
        await onSubmit(currentItemId, Array.from(selectedIngredients));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cn(className, "flex flex-1", full && "items-center")}>
      <ProductImage imageUrl={imageUrl} />

      <div className={cn("w-[490px] rounded-r-xl bg-[#f7f6f5] p-7", full && "rounded-xl")}>
        {full ? (
          <Title text={name} size="md" className="mb-1 font-extrabold" />
        ) : (
          <DialogTitle className="mb-1 text-[26px] font-extrabold">{name}</DialogTitle>
        )}

        {full ? (
          <p className="mb-2 text-base text-gray-400">{textDetails}</p>
        ) : (
          <DialogDescription className="mb-2 text-base text-gray-400">{textDetails}</DialogDescription>
        )}

        <p className="text-base font-normal leading-4">{description}</p>

        <div className="mt-5 flex flex-col gap-4">
          <GroupVariants
            items={availableQuantities}
            value={quantity}
            onClick={(value) => setQuantity(value as ProductQuantityValue)}
          />
        </div>

        {ingredients.length > 0 && (
          <IngredientVariants
            className="mt-5 p-5"
            addIngredient={addIngredient}
            ingredients={ingredients}
            selectedIngredients={selectedIngredients}
          />
        )}

        {loading ? (
          <Button disabled className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">
            <Loader2 className="animate-spin" />
            Подождите
          </Button>
        ) : (
          <Button
            onClick={() => void handleClickAdd()}
            className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChooseProductForm;
