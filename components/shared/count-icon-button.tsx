import { Minus, Plus } from "lucide-react";
import { CountButtonProps } from "./count-button";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
        "disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        "hover:bg-primary hover:text-white",
        "dark:bg-gray-800 dark:hover:bg-primary dark:hover:text-gray-800",
        buttonSizeClass
      )}
    >
      {type === "plus" ? <Plus className={iconSize} /> : <Minus className={iconSize} />}
    </Button>
  );
};
