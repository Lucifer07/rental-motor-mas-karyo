import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const motorcycles = await prisma.motorcycle.findMany({
      where: { isActive: true },
      include: { prices: true },
      orderBy: { order: "asc" },
    });
    return Response.json(motorcycles);
  } catch {
    return Response.json({ error: "Failed to fetch motorcycles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, image, category, order } = body;

    if (!name || !slug || !description || !image || !category) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const motorcycle = await prisma.motorcycle.create({
      data: { name, slug, description, image, category, order: order ?? 0 },
    });

    return Response.json(motorcycle, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create motorcycle" }, { status: 500 });
  }
}
