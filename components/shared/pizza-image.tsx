import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
  size: 25 | 30 | 35;
}

const PizzaImage: React.FC<Props> = ({ className, imageUrl, size }) => {
  const sizeMapping = {
    25: { width: 300, height: 300 },
    30: { width: 400, height: 400 },
    35: { width: 500, height: 500 },
  };

  const { width, height } = sizeMapping[size];

  return (
    <div className={cn("relative flex w-full flex-1 items-center justify-center", className)}>
      <Image
        src={imageUrl}
        alt="Pizza"
        className="relative left-2 top-2 z-10 transition-all duration-300"
        width={width}
        height={height}
      />

      <div className="absolute left-1/2 top-1/2 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-200" />
      <div className="absolute left-1/2 top-1/2 size-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-gray-100" />
    </div>
  );
};

export default PizzaImage;
