import React from "react";
import { Toaster } from "../ui/toaster";
import { ThemeProvider } from "./theme-provider";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import CartProvider from "./cart-provider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        {children}
        <Toaster />
        <NextTopLoader color="hsl(var(--primary))" crawlSpeed={200} height={3} />
        <CartProvider />
      </SessionProvider>
    </ThemeProvider>
  );
};
