import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authorized = isAuthorizedAdmin(req);
  return NextResponse.json({ authenticated: authorized });
}
