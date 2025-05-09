import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/comerciantes/${params.id}/establecimientos`,
    {
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
