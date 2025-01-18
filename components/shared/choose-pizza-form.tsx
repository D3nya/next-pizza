"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { usePizzaOptions } from "@/hooks/use-pizza-options";
import { getPizzaDetails } from "@/lib/get-pizza-details";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/products";

import { Button } from "../ui/button";
import PizzaImage from "./pizza-image";
import GroupVariants from "./group-variants";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import IngredientVariants from "./ingredient-variants";
import { Loader2 } from "lucide-react";
import Title from "./title";

type Props = {
  imageUrl: string;
  description: string;
  name: string;
  ingredients: Ingredient[];
  productItems: ProductItem[];
  className?: string;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
  full?: boolean;
};

const ChoosePizzaForm: React.FC<Props> = ({
  name,
  productItems,
  imageUrl,
  ingredients,
  className,
  description,
  onSubmit,
  loading,
  full,
}) => {
  const { size, type, setSize, setType, selectedIngredients, addIngredient, availableSizes, currentItemId } =
    usePizzaOptions(productItems);

  const { totalPrice, textDetails } = getPizzaDetails(type, size, productItems, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1", full && "items-center")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

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
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <IngredientVariants
          className="mt-5 p-5"
          addIngredient={addIngredient}
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
        />

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

export default ChoosePizzaForm;
