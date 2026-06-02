import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const faq = await prisma.faq.findUnique({ where: { id } });

    if (!faq) {
      return Response.json({ error: "FAQ not found" }, { status: 404 });
    }

    return Response.json(faq);
  } catch {
    return Response.json({ error: "Failed to fetch FAQ" }, { status: 500 });
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
    const faq = await prisma.faq.update({ where: { id }, data: body });

    return Response.json(faq);
  } catch {
    return Response.json({ error: "Failed to update FAQ" }, { status: 500 });
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
    await prisma.faq.delete({ where: { id } });

    return Response.json({ message: "FAQ deleted" });
  } catch {
    return Response.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
