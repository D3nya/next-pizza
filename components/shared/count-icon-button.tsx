import { Minus, Plus } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { CountButtonProps } from "./count-button";

interface IconButtonProps {
  size?: CountButtonProps["size"];
  disabled?: boolean;
  type?: "plus" | "minus";
  onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({ size = "sm", disabled, type, onClick }) => {
  const iconSize = size === "sm" ? "h-4" : "h-5";
  const buttonSizeClass = size === "sm" ? "w-[30px] h-[30px] rounded-[10px]" : "w-[38px] h-[38px] rounded-md";

  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        "p-0 transition-colors",
        "disabled:border-gray-400 disabled:bg-white disabled:text-gray-400",
        "hover:bg-primary hover:text-white",
        "dark:bg-gray-800 dark:hover:bg-primary dark:hover:text-gray-800",
        buttonSizeClass,
      )}
    >
      {type === "plus" ? <Plus className={iconSize} /> : <Minus className={iconSize} />}
    </Button>
  );
};
