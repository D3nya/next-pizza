import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import Container from "@/components/shared/container";
import ProductImage from "@/components/shared/product-image";
import Title from "@/components/shared/title";
import GroupVariants from "@/components/shared/group-variants";

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
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} />
        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ipsum velit voluptas quis, autem voluptates
            dicta soluta, dolorum veritatis magnam laborum repudiandae aliquid repellat officiis perferendis harum
            exercitationem? Quisquam, explicabo.
          </p>

          <GroupVariants
            items={[
              {
                name: "Маленькая",
                value: "1",
              },
              {
                name: "Средняя",
                value: "2",
              },
              {
                name: "Большая",
                value: "3",
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
