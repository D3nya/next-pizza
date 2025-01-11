import { Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

import { categories, ingredients, products } from "./constants";

const randomDecimalNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

type GenerateProductItemOptions = {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 25 | 30 | 35;
  price?: number;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  price = randomDecimalNumber(150, 1000),
}: GenerateProductItemOptions): Prisma.ProductItemUncheckedCreateInput => {
  if (pizzaType && ![1, 2].includes(pizzaType)) {
    throw new Error("Invalid pizzaType. Allowed values are 1 or 2.");
  }

  if (size && ![25, 30, 35].includes(size)) {
    throw new Error("Invalid size. Allowed values are 20, 30, or 40.");
  }

  return {
    productId,
    price,
    pizzaType,
    size,
  };
};

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Test User 1",
        email: "user1@test.ru",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Test User 2",
        email: "user2@test.ru",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "/assets/images/products/pizzas/cheese.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "/assets/images/products/pizzas/pepperoni-fresh.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Двойной цыпленок",
      imageUrl: "/assets/images/products/pizzas/double-chicken.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Ветчина и сыр",
      imageUrl: "/assets/images/products/pizzas/ham-and-cheese.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "/assets/images/products/pizzas/chorizo-fresh.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Ветчина и грибы",
      imageUrl: "/assets/images/products/pizzas/ham-and-mushrooms.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Мясная",
      imageUrl: "/assets/images/products/pizzas/meat.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Бургер-пицца",
      imageUrl: "/assets/images/products/pizzas/burger-pizza.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Пепперони",
      imageUrl: "/assets/images/products/pizzas/pepperoni.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza10 = await prisma.product.create({
    data: {
      name: "Гавайская",
      imageUrl: "/assets/images/products/pizzas/hawaiian.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  const pizza11 = await prisma.product.create({
    data: {
      name: "Цыпленок барбекю",
      imageUrl: "/assets/images/products/pizzas/bbq-chicken.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Pizza1
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 35 }),

      // Pizza2
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 35 }),

      // Pizza3
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 35 }),

      // Pizza4
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 35 }),

      // Pizza5
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 35 }),

      // Pizza6
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 35 }),

      // Pizza7
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 35 }),

      // Pizza8
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 35 }),

      // Pizza9
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 35 }),

      // Pizza10
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 35 }),

      // Pizza11
      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 25 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 35 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 35 }),

      // Other products
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
      generateProductItem({ productId: 18 }),
      generateProductItem({ productId: 19 }),
      generateProductItem({ productId: 20 }),
      generateProductItem({ productId: 21 }),
      generateProductItem({ productId: 22 }),
      generateProductItem({ productId: 23 }),
      generateProductItem({ productId: 24 }),
      generateProductItem({ productId: 25 }),
      generateProductItem({ productId: 26 }),
      generateProductItem({ productId: 27 }),
      generateProductItem({ productId: 28 }),
      generateProductItem({ productId: 29 }),
      generateProductItem({ productId: 30 }),
      generateProductItem({ productId: 31 }),
      generateProductItem({ productId: 32 }),
      generateProductItem({ productId: 33 }),
      generateProductItem({ productId: 34 }),
      generateProductItem({ productId: 35 }),
      generateProductItem({ productId: 36 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
      {
        userId: 3,
        totalAmount: 0,
        token: "333333",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      quantity: 2,
      cartId: 1,
      productItemId: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
