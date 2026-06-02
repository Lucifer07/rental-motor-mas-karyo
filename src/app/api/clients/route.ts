import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return Response.json(clients);
  } catch {
    return Response.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, logo, order } = body;

    if (!name || !logo) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: { name, logo, order: order ?? 0 },
    });

    return Response.json(client, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create client" }, { status: 500 });
  }
}
