import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <Image className={cn("h-[80px] w-[80px]", className)} src={src} alt="Image" width={80} height={80} />;
};
