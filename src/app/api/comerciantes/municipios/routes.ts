import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/comerciantes/municipios`,
    {
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
