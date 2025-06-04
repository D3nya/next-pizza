"use client";

import React from "react";
import ProductsGroupList from "./products-group-list";
import { CategoryWithRelations } from "@/lib/find-pizzas";
import { useCategoryActions } from "@/store/category";
import { useMostVisibleSection } from "@/hooks/use-most-visible-section";

interface ProductsListProps {
  categories: CategoryWithRelations[];
}

export const ProductsList: React.FC<ProductsListProps> = ({ categories }) => {
  const { setActiveCategoryId } = useCategoryActions();
  const sectionRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const categoryIds = categories.map((c) => c.id);
  const mostVisibleId = useMostVisibleSection(sectionRefs.current, categoryIds);

  React.useEffect(() => {
    if (mostVisibleId !== null) {
      setActiveCategoryId(mostVisibleId);
    }
  }, [mostVisibleId, setActiveCategoryId]);

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-16">
        {categories.map(
          (category) =>
            category.products.length > 0 && (
              <div
                key={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                data-category-id={category.id}
              >
                <ProductsGroupList title={category.name} categoryId={category.id} items={category.products} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProductsList;
