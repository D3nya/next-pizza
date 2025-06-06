import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import React from "react";

import { Toaster } from "../ui/toaster";
import CartProvider from "./cart-provider";
import { ThemeProvider } from "./theme-provider";

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
