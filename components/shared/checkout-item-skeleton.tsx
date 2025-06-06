import React from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5">
        <Skeleton className="size-[50px] rounded-full" />
        <Skeleton className="h-5 w-40 rounded" />
      </div>
      <Skeleton className="h-5 w-10 rounded" />
      <Skeleton className="h-8 w-[133px] rounded" />
    </div>
  );
};
