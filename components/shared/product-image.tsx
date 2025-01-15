import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  className?: string;
  imageUrl: string;
};

const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
      <Image
        src={imageUrl}
        alt="Product"
        className="relative left-2 top-2 transition-all z-10 duration-300 w-auto h-auto"
        width={300}
        height={300}
      />
    </div>
  );
};

export default ProductImage;
