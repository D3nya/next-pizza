import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import Title from "./title";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  className?: string;
}

const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className, description }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} className="flex h-full flex-col justify-between" passHref>
        <div>
          <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
            <Image
              src={imageUrl}
              alt={name}
              width={215}
              height={215}
              className="size-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>

          <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        </div>

        <p className="text-sm text-gray-400">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px] font-bold">от {price} ₽</span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
