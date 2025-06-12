import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { registerUser } from "@/app/actions";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formRegisterSchema, TFormRegisterValues } from "@/constants/auth-form-schema";
import { useToast } from "@/hooks/use-toast";

interface Props {
  handleClose: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ handleClose }) => {
  const { toast } = useToast();
  const methods = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast({
        title: "Регистрация успешна!",
        description: "Подтвердите свою почту.",
      });

      handleClose();
    } catch (error) {
      console.error("Error [REGISTER]", error);
      return toast({
        variant: "destructive",
        title: "Упс! Что-то пошло не так.",
        description: "Неверный E-Mail или пароль.",
      });
    }
  };

  const loading = formState.isSubmitting;

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-5" onSubmit={void handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            <DialogTitle className="text-[26px] font-bold">Регистрация</DialogTitle>
            <DialogDescription className="text-gray-400">
              Введите свою почту, полное имя и пароль чтобы создать аккаунт
            </DialogDescription>
          </div>
          <Image src="/assets/images/phone-icon.png" alt="Phone" width={64} height={64} className="size-16" />
        </div>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        {loading ? (
          <Button disabled className="h-12 text-base">
            <Loader2 className="animate-spin" />
            Регистрация...
          </Button>
        ) : (
          <Button className="h-12 text-base" type="submit">
            Зарегистрироваться
          </Button>
        )}
      </form>
    </FormProvider>
  );
};
