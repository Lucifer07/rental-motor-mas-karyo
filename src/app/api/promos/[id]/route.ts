import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const promo = await prisma.promo.findUnique({ where: { id } });

    if (!promo) {
      return Response.json({ error: "Promo not found" }, { status: 404 });
    }

    return Response.json(promo);
  } catch {
    return Response.json({ error: "Failed to fetch promo" }, { status: 500 });
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
    const promo = await prisma.promo.update({ where: { id }, data: body });

    return Response.json(promo);
  } catch {
    return Response.json({ error: "Failed to update promo" }, { status: 500 });
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
    await prisma.promo.delete({ where: { id } });

    return Response.json({ message: "Promo deleted" });
  } catch {
    return Response.json({ error: "Failed to delete promo" }, { status: 500 });
  }
}
