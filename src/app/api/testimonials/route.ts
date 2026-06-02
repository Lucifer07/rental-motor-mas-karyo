import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return Response.json(testimonials);
  } catch {
    return Response.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, role, avatar, rating, comment, order } = body;

    if (!name || !comment) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role: role ?? "Customer",
        avatar: avatar ?? "",
        rating: rating ?? 5.0,
        comment,
        order: order ?? 0,
      },
    });

    return Response.json(testimonial, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
