import { Prisma } from "@prisma/client";

import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  pizzaSizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

export type CategoryWithRelations = Prisma.CategoryGetPayload<{
  include: {
    products: {
      include: {
        ingredients: true;
        productItems: true;
      };
    };
  };
}>;

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2000;

export const findPizzas = async (params: GetSearchParams): Promise<CategoryWithRelations[]> => {
  const pizzaSizes = params.pizzaSizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.ingredients?.split(",").map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          productItems: {
            some: {
              pizzaSize: {
                in: pizzaSizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          productItems: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
