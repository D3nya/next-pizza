import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import ChooseProductModal from "@/components/shared/modals/choose-product-modal";

type Params = Promise<{ id: string }>;

export default async function ProductModalPage(props: { params: Params }) {
  const { id: stringId } = await props.params;
  const id = Number(stringId);

  if (isNaN(id)) {
    return notFound();
  }

  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      ingredients: true,
      productItems: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
