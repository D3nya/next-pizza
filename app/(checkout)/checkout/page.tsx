"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants/checkout-form-schema";
import Container from "@/components/shared/container";
import Title from "@/components/shared/title";
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { createOrder } from "@/app/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";
import { useCartActions, useCartItems, useCartLoading, useCartTotal } from "@/store/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { data } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const { updateItemTotalCount, removeCartItem } = useCartActions();
  const items = useCartItems();
  const totalAmount = useCartTotal();
  const loading = useCartLoading();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  async function fetchUserInfo() {
    const data = await Api.auth.getMe();
    const [firstName, lastName] = data.fullName.split(" ");

    form.setValue("firstName", firstName);
    form.setValue("lastName", lastName);
    form.setValue("email", data.email);
  }

  useEffect(() => {
    if (data) {
      fetchUserInfo();
    }
  }, [data]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      if (url) {
        router.push(url);
      }

      toast({
        title: "Заказ успешно оформлен!",
        description: "Пицца скоро приедет к вам.",
      });
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast({
        variant: "destructive",
        title: "Ой-ой! Что-то пошло не так.",
        description: "Не удалось создать заказ.",
      });
    }
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
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
