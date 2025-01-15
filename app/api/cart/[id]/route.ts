import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";

type Params = Promise<{ id: string }>;

export async function PATCH(req: NextRequest, props: { params: Params }) {
  try {
    const { id: stringId } = await props.params;
    const id = Number(stringId);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Bad ID" });
    }

    const data = (await req.json()) as { totalCount: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        totalCount: data.totalCount,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_PATCH] Server error", error);
    return NextResponse.json({ message: "Не удалось обновить корзину" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Params }) {
  try {
    const { id: stringId } = await props.params;
    const id = Number(stringId);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Bad ID" });
    }

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json({ message: "Не удалось удалить корзину" }, { status: 500 });
  }
}
