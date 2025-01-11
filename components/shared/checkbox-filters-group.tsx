"use client";

import React, { useState } from "react";
import FilterCheckbox, { FilterCheckboxProps as Item } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Props = {
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
};

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
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />)}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
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
    displayedItems = (defaultItems || items).slice(0, limit);
  }

  const checkedItems = displayedItems.filter((item) => selected?.has(item.value));
  const uncheckedItems = displayedItems.filter((item) => !selected?.has(item.value));

  const sortedList = [...checkedItems, ...uncheckedItems];

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            className="bg-gray-50 border-none"
            placeholder={searchInputPlaceholder}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
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
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button onClick={onClickShowAll} className="text-primary mt-3">
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFiltersGroup;
