import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || "900", 10);

  try {
    console.log("Login request received:", { email, password });
    const backendRes = await fetch(
      `${process.env.BACKEND_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    console.log({ backendRes });

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const data = await backendRes.json();

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: JWT_EXPIRES_IN,
    });

    return response;
  } catch (error) {
    console.error("Error during login request:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
