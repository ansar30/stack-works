import { NextRequest, NextResponse } from "next/server";
import { generateAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "stackworks2026!";

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { error: "Invalid admin username or password" },
        { status: 401 }
      );
    }

    const token = generateAdminToken();

    const response = NextResponse.json(
      { success: true, message: "Admin authenticated successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
