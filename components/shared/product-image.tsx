import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
}

const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div className={cn("relative flex w-full flex-1 items-center justify-center", className)}>
      <Image
        src={imageUrl}
        alt="Product"
        className="relative left-2 top-2 z-10 size-auto transition-all duration-300"
        width={300}
        height={300}
      />
    </div>
  );
};

export default ProductImage;
