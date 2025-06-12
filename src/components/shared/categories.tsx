"use client";

import { Category } from "@prisma/client";
import React from "react";

import { cn } from "@/lib/utils";
import { useActiveCategoryId } from "@/store/category";

interface Props {
  items: Category[];
  className?: string;
}

const Categories: React.FC<Props> = ({ items, className }) => {
  const activeCategoryId = useActiveCategoryId();

  return (
    <div className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1 dark:bg-gray-800", className)}>
      {items.map(({ name, id }) => (
        <a
          key={id}
          href={`/#${name}`}
          className={cn(
            "flex h-11 cursor-pointer items-center rounded-2xl px-5 font-bold",
            activeCategoryId === id &&
              "bg-white text-primary shadow-md shadow-gray-200 dark:bg-gray-900 dark:shadow-none dark:shadow-black",
          )}
        >
          {name}
        </a>
      ))}
    </div>
  );
};

export default Categories;
