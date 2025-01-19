"use client";

import { formRegisterSchema, TFormRegisterValues } from "@/constants/auth-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import Container from "./container";
import Title from "./title";
import { FormInput } from "./form/form-input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateUserInfo } from "@/app/actions";

type Props = {
  data: User;
};

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

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
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title text={"Личные данные"} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
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
