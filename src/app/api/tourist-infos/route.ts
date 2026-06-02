import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const touristInfos = await prisma.touristInfo.findMany({
      where: { isActive: true },
    });
    return Response.json(touristInfos);
  } catch {
    return Response.json({ error: "Failed to fetch tourist infos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, image } = body;

    if (!title || !description) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const touristInfo = await prisma.touristInfo.create({
      data: { title, description, image: image ?? null },
    });

    return Response.json(touristInfo, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create tourist info" }, { status: 500 });
  }
}
