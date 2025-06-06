import { X } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn("absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100", className)}
    >
      <X className="size-5" />
    </button>
  );
};
