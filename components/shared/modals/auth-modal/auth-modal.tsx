"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ProfileButton } from "../../profile-button";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

export const AuthModal: React.FC = () => {
  const [type, setType] = useState<"login" | "register">("login");
  const [open, setOpen] = useState<boolean>(false);

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ProfileButton onClickSignIn={() => setOpen(true)} />
      <DialogContent className="w-[450px] bg-white p-10 dark:bg-gray-800">
        {type === "login" ? <LoginForm handleClose={handleClose} /> : <RegisterForm handleClose={handleClose} />}

        <hr />

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => void signIn("github", { redirect: true, redirectTo: "/" })}
            className="h-12 flex-1 gap-2 p-2"
          >
            <Image className="size-6" width={24} height={24} src="/assets/images/github.svg" alt="Github" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() => void signIn("google", { redirect: true, redirectTo: "/" })}
            type="button"
            className="h-12 flex-1 gap-2 p-2"
          >
            <Image className="size-6" width={24} height={24} src="/assets/images/google.svg" alt="Google" />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== "login" ? "Войти" : "Регистрация"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
