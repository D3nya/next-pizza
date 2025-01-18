import { Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import crypto from "crypto";

import { categories, ingredients, products } from "./constants";

const randomDecimalNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

type GenerateProductItemOptions = {
  productId: number;
  weight: number;
  price?: number;
  pizzaType?: 1 | 2;
  pizzaSize?: 25 | 30 | 35;
  quantity?: string;
};

const generateProductItem = ({
  productId,
  weight,
  price = randomDecimalNumber(150, 2000),
  pizzaType,
  pizzaSize,
  quantity,
}: GenerateProductItemOptions): Prisma.ProductItemUncheckedCreateInput => {
  if (pizzaType && ![1, 2].includes(pizzaType)) {
    throw new Error("Invalid pizzaType. Allowed values are 1 or 2.");
  }

  if (pizzaSize && ![25, 30, 35].includes(pizzaSize)) {
    throw new Error("Invalid pizzaSize. Allowed values are 25, 30, or 35.");
  }

  return {
    productId,
    weight,
    price,
    pizzaType,
    pizzaSize,
    quantity,
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
  // Users
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

  // Categories
  await prisma.category.createMany({
    data: categories,
  });

  // Ingredients
  await prisma.ingredient.createMany({
    data: ingredients,
  });

  // Products (Other)
  await prisma.product.createMany({
    data: products,
  });

  // Americano
  const americano = await prisma.product.create({
    data: {
      name: "Кофе Американо",
      imageUrl: "/assets/images/products/coffee/americano-coffee.avif",
      categoryId: 5,
      description: "Горячий кофе для ценителей чистого вкуса",
      ingredients: {
        connect: [{ id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }],
      },
    },
  });

  // Latte
  const latte = await prisma.product.create({
    data: {
      name: "Кофе Латте",
      description: "Идеально сбалансированное сочетание кофе, увеличенной порции молока и нежнейшей пенки",
      imageUrl: "/assets/images/products/coffee/coffee-latte.avif",
      categoryId: 5,
      ingredients: {
        connect: [{ id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }],
      },
    },
  });

  // Cappuccino
  const cappuccino = await prisma.product.create({
    data: {
      name: "Кофе Капучино",
      description: "Легендарный рецепт кофе: эспрессо, горячее молоко и плотная молочная пенка",
      imageUrl: "/assets/images/products/coffee/coffee-cappuccino.avif",
      categoryId: 5,
      ingredients: {
        connect: [{ id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }],
      },
    },
  });

  // Products(Pizza)
  const pizza1 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "/assets/images/products/pizzas/cheese.png",
      categoryId: 1,
      description: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
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
      description: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
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
      description: "Цыпленок, моцарелла, фирменный соус альфредо",
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
      description: "Ветчина, моцарелла, фирменный соус альфредо",
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
      description: "Острые колбаски чоризо, сладкий перец, моцарелла, фирменный томатный соус",
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
      description: "Ветчина, шампиньоны, увеличенная порция моцареллы, фирменный томатный соус",
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
      description: "Цыпленок, ветчина, пикантная пепперони, острые колбаски чоризо, моцарелла, фирменный томатный соус",
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
      description:
        "Ветчина, маринованные огурчики, томаты, красный лук, чеснок, соус бургер, моцарелла, фирменный томатный соус",
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
      description: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
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
      description: "Двойная порция цыпленка, ананасы, моцарелла, фирменный соус альфредо",
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
      description: "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
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

  // Product items
  await prisma.productItem.createMany({
    data: [
      // Pizza1
      generateProductItem({ productId: pizza1.id, pizzaType: 1, pizzaSize: 25, weight: 310 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, pizzaSize: 30, weight: 470 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, pizzaSize: 35, weight: 640 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, pizzaSize: 30, weight: 360 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, pizzaSize: 35, weight: 530 }),

      // Pizza2
      generateProductItem({ productId: pizza2.id, pizzaType: 1, pizzaSize: 25, weight: 380 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, pizzaSize: 30, weight: 590 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, pizzaSize: 35, weight: 790 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, pizzaSize: 30, weight: 490 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, pizzaSize: 35, weight: 670 }),

      // Pizza3
      generateProductItem({ productId: pizza3.id, pizzaType: 1, pizzaSize: 25, weight: 360 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, pizzaSize: 30, weight: 520 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, pizzaSize: 35, weight: 730 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, pizzaSize: 30, weight: 430 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, pizzaSize: 35, weight: 610 }),

      // Pizza4
      generateProductItem({ productId: pizza4.id, pizzaType: 1, pizzaSize: 25, weight: 320 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, pizzaSize: 30, weight: 480 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, pizzaSize: 35, weight: 630 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, pizzaSize: 30, weight: 370 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, pizzaSize: 35, weight: 550 }),

      // Pizza5
      generateProductItem({ productId: pizza5.id, pizzaType: 1, pizzaSize: 25, weight: 330 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, pizzaSize: 30, weight: 470 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, pizzaSize: 35, weight: 630 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, pizzaSize: 30, weight: 380 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, pizzaSize: 35, weight: 500 }),

      // Pizza6
      generateProductItem({ productId: pizza6.id, pizzaType: 1, pizzaSize: 25, weight: 370 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, pizzaSize: 30, weight: 580 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, pizzaSize: 35, weight: 740 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, pizzaSize: 30, weight: 450 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, pizzaSize: 35, weight: 660 }),

      // Pizza7
      generateProductItem({ productId: pizza7.id, pizzaType: 1, pizzaSize: 25, weight: 390 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, pizzaSize: 30, weight: 590 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, pizzaSize: 35, weight: 820 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, pizzaSize: 30, weight: 490 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, pizzaSize: 35, weight: 700 }),

      // Pizza8
      generateProductItem({ productId: pizza8.id, pizzaType: 1, pizzaSize: 25, weight: 420 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, pizzaSize: 30, weight: 630 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, pizzaSize: 35, weight: 890 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, pizzaSize: 30, weight: 540 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, pizzaSize: 35, weight: 780 }),

      // Pizza9
      generateProductItem({ productId: pizza9.id, pizzaType: 1, pizzaSize: 25, weight: 340 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, pizzaSize: 30, weight: 550 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, pizzaSize: 35, weight: 760 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, pizzaSize: 30, weight: 450 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, pizzaSize: 35, weight: 630 }),

      // Pizza10
      generateProductItem({ productId: pizza10.id, pizzaType: 1, pizzaSize: 25, weight: 390 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, pizzaSize: 30, weight: 590 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, pizzaSize: 35, weight: 810 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, pizzaSize: 30, weight: 490 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, pizzaSize: 35, weight: 680 }),

      // Pizza11
      generateProductItem({ productId: pizza11.id, pizzaType: 1, pizzaSize: 25, weight: 420 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 1, pizzaSize: 30, weight: 640 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 1, pizzaSize: 35, weight: 900 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, pizzaSize: 30, weight: 540 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, pizzaSize: 35, weight: 780 }),

      // Other products
      generateProductItem({ productId: 1, quantity: "3", weight: 40 }),
      generateProductItem({ productId: 1, quantity: "5", weight: 70 }),
      generateProductItem({ productId: 2, quantity: "1", weight: 210 }),
      generateProductItem({ productId: 3, quantity: "1", weight: 210 }),
      generateProductItem({ productId: 4, quantity: "1", weight: 160 }),
      generateProductItem({ productId: 5, quantity: "1", weight: 210 }),
      generateProductItem({ productId: 6, quantity: "1", weight: 190 }),
      generateProductItem({ productId: 7, quantity: "1", weight: 160 }),
      generateProductItem({ productId: 8, quantity: "1", weight: 150 }),
      generateProductItem({ productId: 9, quantity: "Стандартная", weight: 100 }),
      generateProductItem({ productId: 9, quantity: "Большая", weight: 180 }),
      generateProductItem({ productId: 10, quantity: "1", weight: 170 }),
      generateProductItem({ productId: 11, quantity: "1", weight: 110 }),
      generateProductItem({ productId: 12, quantity: "1", weight: 130 }),
      generateProductItem({ productId: 13, quantity: "1", weight: 110 }),
      generateProductItem({ productId: 14, quantity: "1", weight: 100 }),
      generateProductItem({ productId: 15, quantity: "2", weight: 140 }),
      generateProductItem({ productId: 15, quantity: "4", weight: 270 }),
      generateProductItem({ productId: 16, quantity: "2", weight: 150 }),
      generateProductItem({ productId: 16, quantity: "4", weight: 280 }),
      generateProductItem({ productId: 17, quantity: "2", weight: 130 }),
      generateProductItem({ productId: 17, quantity: "4", weight: 270 }),
      generateProductItem({ productId: 18, quantity: "0.3", weight: 270 }),
      generateProductItem({ productId: 19, quantity: "0.3", weight: 270 }),
      generateProductItem({ productId: 20, quantity: "0.3", weight: 310 }),
      generateProductItem({ productId: 21, quantity: "0.3", weight: 280 }),
      generateProductItem({ productId: 22, quantity: "0.3", weight: 240 }),
      generateProductItem({ productId: 23, quantity: "0.3", weight: 280 }),
      generateProductItem({ productId: 24, quantity: "0.5", weight: 500 }),
      generateProductItem({ productId: 25, quantity: "0.5", weight: 500 }),
      generateProductItem({ productId: 26, quantity: "0.5", weight: 500 }),
      generateProductItem({ productId: 27, quantity: "0.5", weight: 500 }),
      generateProductItem({ productId: 28, quantity: "1", weight: 100 }),
      generateProductItem({ productId: 29, quantity: "1", weight: 100 }),
      generateProductItem({ productId: 30, quantity: "2", weight: 160 }),
      generateProductItem({ productId: 31, quantity: "1", weight: 120 }),
      generateProductItem({ productId: 32, quantity: "3", weight: 45 }),
      generateProductItem({ productId: 33, quantity: "1", weight: 25 }),
      generateProductItem({ productId: 34, quantity: "1", weight: 25 }),
      generateProductItem({ productId: 35, quantity: "1", weight: 25 }),
      generateProductItem({ productId: americano.id, quantity: "0.3", weight: 330 }),
      generateProductItem({ productId: americano.id, quantity: "0.4", weight: 380 }),
      generateProductItem({ productId: latte.id, quantity: "0.3", weight: 330 }),
      generateProductItem({ productId: latte.id, quantity: "0.4", weight: 380 }),
      generateProductItem({ productId: cappuccino.id, quantity: "0.3", weight: 330 }),
      generateProductItem({ productId: cappuccino.id, quantity: "0.4", weight: 380 }),
    ],
  });

  // Cart
  await prisma.cart.createMany({
    data: [
      {
        totalAmount: 0,
        token: crypto.randomUUID(),
      },
      {
        userId: 1,
        totalAmount: 0,
        token: crypto.randomUUID(),
      },
      {
        userId: 2,
        totalAmount: 0,
        token: crypto.randomUUID(),
      },
      {
        userId: 3,
        totalAmount: 0,
        token: crypto.randomUUID(),
      },
    ],
  });

  // Cart items
  await prisma.cartItem.create({
    data: {
      totalCount: 2,
      cartId: 1,
      productItemId: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.cart.update({
    where: { id: 1 },
    data: { totalAmount: 2590 },
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
