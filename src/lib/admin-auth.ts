import { createHmac, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "museum_admin_session";

function sign(value: string) {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SECRET is not set");
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminSessionValue() {
  const payload = Buffer.from(
    JSON.stringify({
      role: "admin",
      ts: Date.now(),
    })
  ).toString("base64url");

  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function verifyAdminSessionValue(value: string | undefined) {
  if (!value) return false;

  const [payload, signature] = value.split(".");

  if (!payload || !signature) return false;

  const expected = sign(payload);

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function checkAdminCredentials(login: string, password: string) {
  const adminLogin = process.env.ADMIN_LOGIN;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminLogin || !adminPasswordHash) {
    throw new Error("ADMIN_LOGIN or ADMIN_PASSWORD_HASH is not set");
  }

  if (login !== adminLogin) {
    return false;
  }

  return bcrypt.compare(password, adminPasswordHash);
}