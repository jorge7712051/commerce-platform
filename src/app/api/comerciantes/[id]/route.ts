import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  const res = await fetch(`${process.env.BACKEND_API_URL}/comerciantes/${id}`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  const res = await fetch(`${process.env.BACKEND_API_URL}/comerciantes/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  const body = await req.json();
  const res = await fetch(`${process.env.BACKEND_API_URL}/comerciantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.get("cookie") || "",
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await res.json(), { status: res.status });
}
