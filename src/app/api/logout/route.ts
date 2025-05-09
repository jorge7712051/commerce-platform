import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada" });
  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
