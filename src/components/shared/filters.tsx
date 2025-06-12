"use client";

import React from "react";

import { useIngredients } from "@/hooks/use-filter-ingredients";
import { useFilters } from "@/hooks/use-filters";
import { useQueryFilters } from "@/hooks/use-query-filters";

import { Input } from "../ui/input";
import CheckboxFiltersGroup from "./checkbox-filters-group";
import RangeSlider from "./range-slider";
import Title from "./title";

interface Props {
  className?: string;
}

const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Type checkboxes */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      {/* Size checkboxes */}
      <CheckboxFiltersGroup
        title="Размер"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaSizes}
        selected={filters.pizzaSizes}
        items={[
          { text: "25 см", value: "25" },
          { text: "30 см", value: "30" },
          { text: "35 см", value: "35" },
        ]}
      />

      {/* Price filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до:</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={2000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={2000}
            placeholder="2000"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[filters.prices.priceFrom ?? 0, filters.prices.priceTo ?? 2000]}
          onValueChange={updatePrices}
        />
      </div>

      {/* Ingredients checkboxes */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};

export default Filters;
