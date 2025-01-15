"use client";

import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import CartDrawerItem from "./cart-drawer-item";
import { useCart } from "@/hooks/use-cart";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { PizzaSize, PizzaType, ProductQuantityValue } from "@/constants/products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getProductDeclension } from "@/lib/get-product-declension";

type Props = {
  className?: string;
};

const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { totalAmount, updateItemTotalCount, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (id: number, totalCount: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? totalCount + 1 : totalCount - 1;
    updateItemTotalCount(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className="font-bold">
                  {items.length} {getProductDeclension(items.length)}
                </span>
              </SheetTitle>
              <SheetDescription>
                Добавьте побольше <span className="text-lg">😊</span>
              </SheetDescription>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <SheetTitle className="text-center font-bold my-2 text-xl">Корзина пустая</SheetTitle>
              <SheetDescription className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </SheetDescription>

              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 flex-1 overflow-auto">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize,
                        item.quantity as ProductQuantityValue
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      totalCount={item.totalCount}
                      onClickCountButton={(type) => onClickCountButton(item.id, item.totalCount, type)}
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href="/checkout">
                    {redirecting ? (
                      <Button disabled className="w-full h-12 text-base">
                        <Loader2 className="animate-spin" />
                        Подождите
                      </Button>
                    ) : (
                      <Button onClick={() => setRedirecting(true)} type="submit" className="w-full h-12 text-base">
                        Оформить заказ
                        <ArrowRight className="w-5 ml-2" />
                      </Button>
                    )}
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
