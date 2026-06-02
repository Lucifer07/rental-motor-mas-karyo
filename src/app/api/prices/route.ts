import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { motorcycleId, category, price12h, price24h } = body;

    if (!motorcycleId || !category || price12h === undefined || price24h === undefined) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const price = await prisma.price.upsert({
      where: {
        motorcycleId_category: { motorcycleId, category },
      },
      update: { price12h, price24h },
      create: { motorcycleId, category, price12h, price24h },
    });

    return Response.json(price, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create/update price" }, { status: 500 });
  }
}
