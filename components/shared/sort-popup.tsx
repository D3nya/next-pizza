import { ArrowUpDown } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5 dark:bg-gray-800",
        className,
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};

export default SortPopup;
