"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createOrder } from "@/app/actions";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import Container from "@/components/shared/container";
import Title from "@/components/shared/title";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants/checkout-form-schema";
import { toast } from "@/hooks/use-toast";
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

  const methods = useForm<CheckoutFormValues>({
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

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await Api.auth.getMe();
        const [firstName, lastName] = data.fullName.split(" ");

        setValue("firstName", firstName);
        setValue("lastName", lastName);
        setValue("email", data.email);
      } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
      }
    }

    if (data) {
      fetchUserInfo().catch((e) => console.error("Ошибка при получении данных пользователя:", e));
    }
  }, [data, setValue]);

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
    updateItemTotalCount(id, newQuantity).catch((e) => {
      console.error("Ошибка при обновлении количества:", e);
    });
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="mb-8 text-[36px] font-extrabold" />

      <FormProvider {...methods}>
        <form onSubmit={void handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left */}
            <div className="mb-20 flex flex-1 flex-col gap-10">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutAddressForm className={loading ? "pointer-events-none opacity-40" : ""} />

              <CheckoutPersonalForm className={loading ? "pointer-events-none opacity-40" : ""} />
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
