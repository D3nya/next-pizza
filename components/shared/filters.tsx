import React from "react";

import Title from "./title";
import FilterCheckbox from "./filter-checkbox";
import { Input } from "../ui/input";
import RangeSlider from "./range-slider";
import CheckboxFilterGroup from "./checkbox-filter-group";

type Props = {
  className?: string;
};

const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Upper checkboxes */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Price filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={5000}
            defaultValue={0}
          />
          <Input
            type="number"
            min={100}
            defaultValue={5000}
            max={5000}
            placeholder="5000"
          />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>

      {/*  */}
      <CheckboxFilterGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={[
          { text: "Сырный соус", value: "0" },
          { text: "Кетчуп", value: "1" },
          { text: "Сыр", value: "2" },
        ]}
        items={[
          { text: "Сырный соус", value: "0" },
          { text: "Кетчуп", value: "1" },
          { text: "Сыр", value: "2" },
          { text: "Сырный соус", value: "0" },
          { text: "Кетчуп", value: "1" },
          { text: "Сыр", value: "2" },
          { text: "Сырный соус", value: "0" },
          { text: "Кетчуп", value: "1" },
          { text: "Сыр", value: "2" },
          { text: "Сырный соус", value: "0" },
          { text: "Кетчуп", value: "1" },
          { text: "Сыр", value: "2" },
          { text: "Сырный соус", value: "0" },
          { text: "Кетчуп", value: "1" },
          { text: "Сыр", value: "2" },
        ]}
      />
    </div>
  );
};

export default Filters;
