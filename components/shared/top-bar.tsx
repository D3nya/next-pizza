import React from "react";

import { cn } from "@/lib/utils";

import Container from "./container";
import Categories from "./categories";
import SortPopup from "./sort-popup";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
  className?: string;
};

const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        "sticky top-0 py-5 bg-white shadow-lg dark:bg-background dark:shadow-none shadow-black/10 z-10",
        className
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
