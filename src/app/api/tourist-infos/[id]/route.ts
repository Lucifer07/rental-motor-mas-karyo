import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const touristInfo = await prisma.touristInfo.findUnique({ where: { id } });

    if (!touristInfo) {
      return Response.json({ error: "Tourist info not found" }, { status: 404 });
    }

    return Response.json(touristInfo);
  } catch {
    return Response.json({ error: "Failed to fetch tourist info" }, { status: 500 });
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
    const touristInfo = await prisma.touristInfo.update({ where: { id }, data: body });

    return Response.json(touristInfo);
  } catch {
    return Response.json({ error: "Failed to update tourist info" }, { status: 500 });
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
    await prisma.touristInfo.delete({ where: { id } });

    return Response.json({ message: "Tourist info deleted" });
  } catch {
    return Response.json({ error: "Failed to delete tourist info" }, { status: 500 });
  }
}
