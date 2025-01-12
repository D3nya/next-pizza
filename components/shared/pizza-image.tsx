import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  className?: string;
  imageUrl: string;
  size: 25 | 30 | 35;
};

const PizzaImage: React.FC<Props> = ({ className, imageUrl, size }) => {
  const sizeMapping = {
    25: { width: 300, height: 300 },
    30: { width: 400, height: 400 },
    35: { width: 500, height: 500 },
  };

  const { width, height } = sizeMapping[size];

  return (
    <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
      <Image
        src={imageUrl}
        alt="Pizza"
        className="relative left-2 top-2 transition-all z-10 duration-300"
        width={width}
        height={height}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};

export default PizzaImage;
