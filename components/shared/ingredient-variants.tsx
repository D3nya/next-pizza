import React from "react";
import { Ingredient } from "@prisma/client";

import IngredientItem from "./ingredient-item";
import { cn } from "@/lib/utils";

type Props = {
  ingredients: Ingredient[];
  addIngredient: (id: number) => void;
  selectedIngredients: Set<number>;
  className?: string;
};

const IngredientVariants: React.FC<Props> = ({ className, ingredients, addIngredient, selectedIngredients }) => {
  return (
    <div className={cn("bg-gray-50 rounded-md h-[420px] overflow-auto scrollbar", className)}>
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
