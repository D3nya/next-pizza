"use client";

import React, { useState } from "react";

import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import FilterCheckbox, { FilterCheckboxProps as Item } from "./filter-checkbox";

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  name?: string;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
}

const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  name,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  onClickCheckbox,
  selected,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  if (loading) {
    return (
      <div className={className}>
        <p className="mb-3 font-bold">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />)}

        <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
      </div>
    );
  }

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClickShowAll = () => {
    setShowAll(!showAll);
    setSearchValue("");
  };

  const filteredItems = items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()));

  let displayedItems: Item[] = [];
  if (showAll) {
    displayedItems = filteredItems;
  } else {
    displayedItems = (defaultItems ?? items).slice(0, limit);
  }

  const checkedItems = displayedItems.filter((item) => selected?.has(item.value));
  const uncheckedItems = displayedItems.filter((item) => !selected?.has(item.value));

  const sortedList = [...checkedItems, ...uncheckedItems];

  return (
    <div className={className}>
      <p className="mb-3 font-bold">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            className="border-none bg-gray-50"
            placeholder={searchInputPlaceholder}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className="flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {sortedList.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            name={name}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "mt-4 border-t border-t-neutral-100" : ""}>
          <button onClick={onClickShowAll} className="mt-3 text-primary">
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFiltersGroup;
