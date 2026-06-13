import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized — reconnectez-vous" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const upstream = new FormData();
  upstream.append("file", file, file instanceof File ? file.name : "upload");

  try {
    const res = await fetch(`${API_URL}/admin/uploads/audio`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: upstream,
    });

    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      return NextResponse.json({ error: data.error ?? "Upload failed" }, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to reach upload server" }, { status: 502 });
  }
}
