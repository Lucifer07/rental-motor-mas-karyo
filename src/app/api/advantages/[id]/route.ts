import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const advantage = await prisma.advantage.findUnique({ where: { id } });

    if (!advantage) {
      return Response.json({ error: "Advantage not found" }, { status: 404 });
    }

    return Response.json(advantage);
  } catch {
    return Response.json({ error: "Failed to fetch advantage" }, { status: 500 });
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
    const advantage = await prisma.advantage.update({ where: { id }, data: body });

    return Response.json(advantage);
  } catch {
    return Response.json({ error: "Failed to update advantage" }, { status: 500 });
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
    await prisma.advantage.delete({ where: { id } });

    return Response.json({ message: "Advantage deleted" });
  } catch {
    return Response.json({ error: "Failed to delete advantage" }, { status: 500 });
  }
}
