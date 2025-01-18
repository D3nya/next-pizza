import React from "react";
import ProductImage from "./product-image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { useProductOptions } from "@/hooks/use-product-options";
import { getProductDetails } from "@/lib/get-product-details";
import IngredientVariants from "./ingredient-variants";
import GroupVariants from "./group-variants";
import { ProductQuantityValue } from "@/constants/products";
import { Loader2 } from "lucide-react";
import Title from "./title";

type Props = {
  imageUrl: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  productItems: ProductItem[];
  className?: string;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
  full?: boolean;
};

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
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1", full && "items-center")}>
      <ProductImage imageUrl={imageUrl} />

      <div className={cn("w-[490px] bg-[#f7f6f5] p-7 rounded-r-xl", full && "rounded-xl")}>
        {full ? (
          <Title text={name} size="md" className="font-extrabold mb-1" />
        ) : (
          <DialogTitle className="font-extrabold mb-1 text-[26px]">{name}</DialogTitle>
        )}

        {full ? (
          <p className="text-gray-400 mb-2 text-base">{textDetails}</p>
        ) : (
          <DialogDescription className="text-gray-400 mb-2 text-base">{textDetails}</DialogDescription>
        )}

        <p className="font-normal leading-4 text-base">{description}</p>

        <div className="flex flex-col gap-4 mt-5">
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
          <Button disabled className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
            <Loader2 className="animate-spin" />
            Подождите
          </Button>
        ) : (
          <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
            Добавить в корзину за {totalPrice} ₽
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChooseProductForm;
