"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Title from "./title";
import ProductCard from "./product-card";
import { ProductWithRelations } from "@/types/prisma";

type Props = {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
};

const ProductsGroupList: React.FC<Props> = ({ title, items, listClassName, className }) => {
  return (
    <div className={className} id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            description={product.description}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.productItems[0].price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
