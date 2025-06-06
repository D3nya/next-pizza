"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import AuthBlock from "./auth-block";
import CartButton from "./cart-button";
import Container from "./container";
import SearchInput from "./search-input";
import ThemeButton from "./theme-button";

interface Props {
  hasSearch: boolean;
  hasCart: boolean;
  className?: string;
}

const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    let toastMessage = "";

    if (queryParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    } else if (queryParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");

        toast({
          title: "Поздравляем!",
          description: toastMessage,
        });
      }, 1000);
    }
  }, [router, queryParams, toast]);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/assets/images/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">Next Pizza</h1>
              <p className="text-sm leading-3 text-gray-400">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {/* Search */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeButton />
          <AuthBlock />
          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
