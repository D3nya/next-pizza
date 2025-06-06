import React from "react";

import { Checkbox } from "../ui/checkbox";

export interface FilterCheckboxProps {
  text: string;
  value: string;
  name?: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  name,
  endAdornment,
  onCheckedChange,
  checked,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="size-6 rounded-[8px]"
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label htmlFor={`checkbox-${String(name)}-${String(value)}`} className="flex-1 cursor-pointer leading-none">
        {text}
      </label>
      {endAdornment}
    </div>
  );
};

export default FilterCheckbox;
