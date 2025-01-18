import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import Container from "@/components/shared/container";
import ProductForm from "@/components/shared/product-form";

type Params = Promise<{ id: string }>;

export default async function ProductPage(props: { params: Params }) {
  const { id: stringId } = await props.params;
  const id = Number(stringId);

  if (isNaN(id)) {
    return notFound();
  }

  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              productItems: true,
            },
          },
        },
      },
      productItems: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} full={true} />
    </Container>
  );
}
