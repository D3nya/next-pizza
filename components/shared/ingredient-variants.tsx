import { Ingredient } from "@prisma/client";
import React from "react";

import { cn } from "@/lib/utils";

import IngredientItem from "./ingredient-item";

interface Props {
  ingredients: Ingredient[];
  addIngredient: (id: number) => void;
  selectedIngredients: Set<number>;
  className?: string;
}

const IngredientVariants: React.FC<Props> = ({ className, ingredients, addIngredient, selectedIngredients }) => {
  return (
    <div className={cn("scrollbar h-[420px] overflow-auto rounded-md bg-gray-50", className)}>
      <div className="grid grid-cols-3 gap-3">
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient.id}
            name={ingredient.name}
            price={ingredient.price}
            imageUrl={ingredient.imageUrl}
            onClick={() => addIngredient(ingredient.id)}
            active={selectedIngredients.has(ingredient.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientVariants;
