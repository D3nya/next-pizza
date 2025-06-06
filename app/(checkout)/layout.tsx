import { Metadata } from "next";

import Container from "@/components/shared/container";
import Header from "@/components/shared/header";

export const metadata: Metadata = {
  title: "Next Pizza | Корзина",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header hasSearch={false} hasCart={false} className="border-b-gray-200" />
        {children}
      </Container>
    </main>
  );
}
