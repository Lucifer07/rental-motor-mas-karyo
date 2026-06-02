import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });

    if (!testimonial) {
      return Response.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return Response.json(testimonial);
  } catch {
    return Response.json({ error: "Failed to fetch testimonial" }, { status: 500 });
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
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: body,
    });

    return Response.json(testimonial);
  } catch {
    return Response.json({ error: "Failed to update testimonial" }, { status: 500 });
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
    await prisma.testimonial.delete({ where: { id } });

    return Response.json({ message: "Testimonial deleted" });
  } catch {
    return Response.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
