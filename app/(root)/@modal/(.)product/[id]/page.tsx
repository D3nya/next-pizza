import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import ChooseProductModal from "@/components/shared/modals/choose-product-modal";

type Props = {
  params: {
    id: string;
  };
};

const ProductModalPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
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
};

export default ProductModalPage;
