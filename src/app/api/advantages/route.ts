import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const advantages = await prisma.advantage.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return Response.json(advantages);
  } catch {
    return Response.json({ error: "Failed to fetch advantages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, icon, order } = body;

    if (!title || !description || !icon) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const advantage = await prisma.advantage.create({
      data: { title, description, icon, order: order ?? 0 },
    });

    return Response.json(advantage, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create advantage" }, { status: 500 });
  }
}
