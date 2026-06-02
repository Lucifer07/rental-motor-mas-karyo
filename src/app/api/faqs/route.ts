import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return Response.json(faqs);
  } catch {
    return Response.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { question, answer, order } = body;

    if (!question || !answer) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const faq = await prisma.faq.create({
      data: { question, answer, order: order ?? 0 },
    });

    return Response.json(faq, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
