"use server";

import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { PayOrderTemplate } from "@/components/shared/email-templates/pay-order";
import { VerificationUserTemplate } from "@/components/shared/email-templates/verification-user";
import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import { callbackPayment, createPayment } from "@/lib/create-payment";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartTokenCookie = cookieStore.get("cartToken");
    if (!cartTokenCookie) {
      throw new Error("Cart token not found");
    }
    const cartToken = cartTokenCookie.value;

    /* Finding a basket by token */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // If the cart is not found, throw an error
    if (!userCart) {
      throw new Error("Cart not found");
    }

    // If the cart is empty, throw an error
    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // Create an order
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems),
      },
    });

    // Clear the cart
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } });

    const paymentData = createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа #" + order.id,
    });

    if (!paymentData?.id || !paymentData.returnUrl) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.returnUrl;

    await sendEmail(
      data.email,
      "Next Pizza | Оплатите заказ №" + order.id + ".",
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }) as React.ReactNode,
    );

    await callbackPayment({ orderId: order.id });

    return paymentUrl;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Сессия не найдена");
    }

    if (!session.user) {
      throw new Error("Пользователь не найден");
    }

    if (!session.user.id) {
      throw new Error("ID не найдено");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log("Error [UPDATE_USER]", err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    if (!body.password) {
      throw new Error("Не указан пароль");
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтверждение регистрации",
      VerificationUserTemplate({
        code,
      }) as React.ReactNode,
    );
  } catch (err) {
    console.log("Error [CREATE_USER]", err);
    throw err;
  }
}
