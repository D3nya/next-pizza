import type { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as unknown;

  const data = body as Prisma.UserCreateInput;

  const user = await prisma.user.create({
    data,
  });

  return NextResponse.json(user);
}
