import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/comerciantes/exportar`,
    {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    }
  );

  const blob = await res.blob();
  return new NextResponse(blob, {
    status: res.status,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="comerciantes.csv"',
    },
  });
}
