import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5">
        <Skeleton className="w-[50px] h-[50px] rounded-full " />
        <Skeleton className="w-40 h-5 rounded " />
      </div>
      <Skeleton className="h-5 w-10 rounded " />
      <Skeleton className="h-8 w-[133px] rounded " />
    </div>
  );
};
