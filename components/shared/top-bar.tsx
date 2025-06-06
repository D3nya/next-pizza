import { Category } from "@prisma/client";
import React from "react";

import { cn } from "@/lib/utils";

import Categories from "./categories";
import Container from "./container";
import SortPopup from "./sort-popup";

interface Props {
  categories: Category[];
  className?: string;
}

const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/10 dark:bg-background dark:shadow-none",
        className,
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};

export default TopBar;
