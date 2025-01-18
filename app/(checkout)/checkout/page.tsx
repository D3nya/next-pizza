"use client";

import { useCart } from "@/hooks/use-cart";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants/checkout-form-schema";
import Container from "@/components/shared/container";
import Title from "@/components/shared/title";
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";

export default function CheckoutPage() {
  const { totalAmount, updateItemTotalCount, items, removeCartItem, loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log(data);
  };

  const onClickCountButton = (id: number, totalCount: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? totalCount + 1 : totalCount - 1;
    updateItemTotalCount(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ""} />

              <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ""} />
            </div>

            {/* Right */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={false} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
