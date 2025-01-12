import React from "react";
import ProductImage from "./product-image";
import Title from "./title";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  className?: string;
};

const ChooseProductForm: React.FC<Props> = ({ name, imageUrl, price, className }) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChooseProductForm;
