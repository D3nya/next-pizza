import { registerUser } from "@/app/actions";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formRegisterSchema, TFormRegisterValues } from "@/constants/auth-form-schema";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  handleClose: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ handleClose }) => {
  const { toast } = useToast();
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

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

  const loading = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className="font-bold text-[26px]">Регистрация</DialogTitle>
            <DialogDescription className="text-gray-400">
              Введите свою почту, полное имя и пароль чтобы создать аккаунт
            </DialogDescription>
          </div>
          <Image src="/assets/images/phone-icon.png" alt="Phone" width={64} height={64} className="w-16 h-16" />
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
