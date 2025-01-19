import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { formLoginSchema, TFormLoginValues } from "@/constants/auth-form-schema";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface Props {
  handleClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ handleClose }) => {
  const { toast } = useToast();
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast({
        title: "Поздравляем!",
        description: "Вы успешно вошли в аккаунт.",
      });

      handleClose();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast({
        variant: "destructive",
        title: "Упс! Что-то пошло не так.",
        description: "Не удалось авторизоваться в аккаунт.",
      });
    }
  };

  const loading = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className="font-bold text-[26px]">Вход в аккаунт</DialogTitle>
            <DialogDescription className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </DialogDescription>
          </div>
          <Image src="/assets/images/phone-icon.png" alt="Phone" width={64} height={64} className="w-16 h-16" />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        {loading ? (
          <Button disabled className="h-12 text-base">
            <Loader2 className="animate-spin" />
            Вход...
          </Button>
        ) : (
          <Button className="h-12 text-base" type="submit">
            Войти
          </Button>
        )}
      </form>
    </FormProvider>
  );
};
