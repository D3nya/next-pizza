"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

type Props = {
  className?: string;
};

// const categories = [
//   "Пиццы",
//   "Комбо",
//   "Закуски",
//   "Коктейли",
//   "Кофе",
//   "Напитки",
//   "Десерты",
//   "Десерты",
// ];

const categories = [
  { id: 1, name: "Пиццы" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
];

const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({ name, id }) => (
        <a
          key={id}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};

export default Categories;
