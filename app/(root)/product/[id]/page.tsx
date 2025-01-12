import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import Container from "@/components/shared/container";
import ProductImage from "@/components/shared/product-image";
import Title from "@/components/shared/title";
import GroupVariants from "@/components/shared/group-variants";

type Props = {
  className?: string;
  params: {
    id: string;
  };
};

const ProductPage: React.FC<Props> = async ({ params, className }) => {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
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
        <ProductImage imageUrl={product.imageUrl} className={className} />
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
};

export default ProductPage;
