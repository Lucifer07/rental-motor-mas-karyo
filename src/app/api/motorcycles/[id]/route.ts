import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const motorcycle = await prisma.motorcycle.findUnique({
      where: { id },
      include: { prices: true },
    });

    if (!motorcycle) {
      return Response.json({ error: "Motorcycle not found" }, { status: 404 });
    }

    return Response.json(motorcycle);
  } catch {
    return Response.json({ error: "Failed to fetch motorcycle" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { prices: newPrices, ...motorcycleData } = body;

    const motorcycle = await prisma.motorcycle.update({
      where: { id },
      data: {
        ...motorcycleData,
        prices: {
          deleteMany: {},
          create: newPrices?.map((p: { category: string; price12h: number; price24h: number; isActive: boolean }) => ({
            category: p.category,
            price12h: p.price12h,
            price24h: p.price24h,
            isActive: p.isActive,
          })) ?? [],
        },
      },
      include: { prices: true },
    });

    return Response.json(motorcycle);
  } catch {
    return Response.json({ error: "Failed to update motorcycle" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.motorcycle.delete({ where: { id } });

    return Response.json({ message: "Motorcycle deleted" });
  } catch {
    return Response.json({ error: "Failed to delete motorcycle" }, { status: 500 });
  }
}
