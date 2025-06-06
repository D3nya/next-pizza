import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formLoginSchema, TFormLoginValues } from "@/constants/auth-form-schema";
import { useToast } from "@/hooks/use-toast";

interface Props {
  handleClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ handleClose }) => {
  const { toast } = useToast();
  const methods = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, formState } = methods;

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

  const loading = formState.isSubmitting;

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-5" onSubmit={void handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            <DialogTitle className="text-[26px] font-bold">Вход в аккаунт</DialogTitle>
            <DialogDescription className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </DialogDescription>
          </div>
          <Image src="/assets/images/phone-icon.png" alt="Phone" width={64} height={64} className="size-16" />
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
