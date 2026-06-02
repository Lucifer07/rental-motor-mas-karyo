import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const setting = await prisma.setting.findUnique({ where: { id } });
    if (!setting) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(setting);
  } catch {
    return Response.json({ error: "Failed to fetch setting" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { key, value } = body;

    const setting = await prisma.setting.update({
      where: { id },
      data: { key: key ?? undefined, value: value ?? undefined },
    });

    return Response.json(setting);
  } catch {
    return Response.json({ error: "Failed to update setting" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.setting.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to delete setting" }, { status: 500 });
  }
}
