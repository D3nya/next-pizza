"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Category } from "@prisma/client";
import { useActiveCategoryId } from "@/store/category";

type Props = {
  items: Category[];
  className?: string;
};

const Categories: React.FC<Props> = ({ items, className }) => {
  const activeCategoryId = useActiveCategoryId();

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-2xl", className)}>
      {items.map(({ name, id }) => (
        <a
          key={id}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer",
            activeCategoryId === id &&
              "bg-white dark:bg-gray-900 shadow-md dark:shadow-none shadow-gray-200 dark:shadow-black text-primary"
          )}
        >
          {name}
        </a>
      ))}
    </div>
  );
};

export default Categories;
