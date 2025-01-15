import React from "react";

import Link from "next/link";
import Image from "next/image";
import Title from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  className?: string;
};

const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className, description }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} className="h-full flex justify-between flex-col" passHref>
        <div>
          <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
            <Image
              src={imageUrl}
              alt={name}
              width={215}
              height={215}
              className="object-cover rounded-lg w-auto h-auto"
              loading="lazy"
            />
          </div>

          <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        </div>

        <p className="text-sm text-gray-400">{description}</p>

        <div className="flex justify-between items-center mt-4">
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
