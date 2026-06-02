import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const promos = await prisma.promo.findMany({
      where: { isActive: true },
    });
    return Response.json(promos);
  } catch {
    return Response.json({ error: "Failed to fetch promos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, image } = body;

    if (!title || !description) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const promo = await prisma.promo.create({
      data: { title, description, image: image ?? null },
    });

    return Response.json(promo, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create promo" }, { status: 500 });
  }
}
