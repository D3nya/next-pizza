"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ProductWithRelations } from "@/types/prisma";

import ProductForm from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("min-h-[500px] w-[1060px] max-w-[1060px] bg-white p-0", className)}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
