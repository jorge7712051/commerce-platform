import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/comerciantes/${id}/establecimientos`,
    {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
