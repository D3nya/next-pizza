"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import { PizzaSize, PizzaType, ProductQuantityValue } from "@/constants/products";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { getProductDeclension } from "@/lib/get-product-declension";
import { cn } from "@/lib/utils";
import { useCartActions, useCartItems, useCartTotal } from "@/store/cart";

import { Button } from "../ui/button";
import CartDrawerItem from "./cart-drawer-item";

interface Props {
  className?: string;
}

const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { updateItemTotalCount, removeCartItem } = useCartActions();
  const items = useCartItems();
  const totalAmount = useCartTotal();

  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = async (id: number, totalCount: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? totalCount + 1 : totalCount - 1;
    try {
      await updateItemTotalCount(id, newQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between bg-gray-100 pb-0 dark:bg-gray-800">
        <div className={cn("flex h-full flex-col", !totalAmount && "justify-center")}>
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
            <div className="mx-auto flex w-72 flex-col items-center justify-center">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <SheetTitle className="my-2 text-center text-xl font-bold">Корзина пустая</SheetTitle>
              <SheetDescription className="mb-5 text-center text-neutral-500">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </SheetDescription>

              <SheetClose asChild>
                <Button className="h-12 w-56 text-base" size="lg">
                  <ArrowLeft className="mr-2 w-5" />
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
                        item.quantity as ProductQuantityValue,
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      totalCount={item.totalCount}
                      onClickCountButton={(type) => void onClickCountButton(item.id, item.totalCount, type)}
                      onClickRemove={() => void removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8 dark:bg-gray-900">
                <div className="w-full">
                  <div className="mb-4 flex">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                    </span>
                    <span className="text-lg font-bold">{totalAmount} ₽</span>
                  </div>

                  <Link href="/checkout">
                    {redirecting ? (
                      <Button disabled className="h-12 w-full text-base">
                        <Loader2 className="animate-spin" />
                        Подождите
                      </Button>
                    ) : (
                      <Button onClick={() => setRedirecting(true)} type="submit" className="h-12 w-full text-base">
                        Оформить заказ
                        <ArrowRight className="ml-2 w-5" />
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
