"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { updateUserInfo } from "@/app/actions";
import { formRegisterSchema, TFormRegisterValues } from "@/constants/auth-form-schema";
import { useToast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import Container from "./container";
import { FormInput } from "./form/form-input";
import Title from "./title";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const { toast } = useToast();

  const methods = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast({
        title: "Успешно!",
        description: "Данные обновлены.",
      });
    } catch (error) {
      console.log("Error [UPDATE_USER]", error);
      return toast({
        variant: "destructive",
        title: "Ой-ой! Что-то пошло не так.",
        description: "Ошибка при обновлении данных.",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({ callbackUrl: "/" }).catch((e) => console.error("Ошибка при выходе из аккаунта:", e));
  };

  return (
    <Container className="my-10">
      <Title text={"Личные данные"} size="md" className="font-bold" />

      <FormProvider {...methods}>
        <form className="mt-10 flex w-96 flex-col gap-5" onSubmit={void handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

          <Button disabled={formState.isSubmitting} className="mt-10 text-base" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
