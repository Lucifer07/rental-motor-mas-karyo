import { writeFile } from "fs/promises";
import path from "path";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", uniqueName);

    await writeFile(filePath, buffer);

    return Response.json({ url: `/uploads/${uniqueName}` }, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
