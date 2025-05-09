import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/comerciantes/${params.id}/estado`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    }
  );

  return NextResponse.json(await res.json(), { status: res.status });
}
