import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "stackworks_admin_session";
const SECRET_KEY = process.env.ADMIN_JWT_SECRET || "stackworks_default_admin_secret_key_2026";

/**
 * Creates a signed token string for admin session
 */
export function generateAdminToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payloadStr)
    .digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Validates token signature and expiration
 */
export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token || !token.includes(".")) return false;

  try {
    const [payloadStr, signature] = token.split(".");
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(payloadStr)
      .digest("base64url");

    if (signature !== expectedSignature) return false;

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    if (!payload || payload.role !== "admin" || payload.exp < Date.now()) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Server-side check for NextRequest in API routes
 */
export function isAuthorizedAdmin(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME);
  return verifyAdminToken(cookie?.value);
}

/**
 * Server-side check for App Router server components/actions
 */
export async function getAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
