import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { OrderFailedTemplate } from "@/components/shared/email-templates/order-failed";
import { OrderSuccessTemplate } from "@/components/shared/email-templates/order-success";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { PaymentCallbackData } from "@/types/payment";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza | Ваш заказ успешно оформлен!",
        OrderSuccessTemplate({ orderId: order.id, items }) as React.ReactNode,
      );
    } else {
      await sendEmail(
        order.email,
        "Next Pizza | К сожалению не удалось оплатить заказ.",
        OrderFailedTemplate({ orderId: order.id, items }) as React.ReactNode,
      );
    }

    return NextResponse.json({ message: "Order status updated successfully" }, { status: 200 });
  } catch (error) {
    console.log("[Checkout Callback] Error:", error);
    return NextResponse.json({ error: "Server error" });
  }
}
