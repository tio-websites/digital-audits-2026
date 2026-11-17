import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SECRET = new TextEncoder().encode(
  process.env.CMS_JWT_SECRET ?? "cms-dev-secret-change-in-production"
);
const COOKIE = "cms_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export interface CmsSession {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "editor";
}

export async function signCmsToken(session: CmsSession): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SECRET);
}

export async function verifyCmsToken(token: string): Promise<CmsSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as CmsSession;
  } catch {
    return null;
  }
}

export async function getCmsSession(): Promise<CmsSession | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  return verifyCmsToken(token);
}

export async function requireCmsSession(): Promise<CmsSession> {
  const session = await getCmsSession();
  if (!session) throw new Error("Unauthenticated");
  return session;
}

// Called on first boot — creates the super admin from env vars if no CmsUser exists
export async function ensureSuperAdmin() {
  const count = await prisma.cmsUser.count();
  if (count > 0) return;

  const email = process.env.CMS_SUPER_ADMIN_EMAIL ?? "cms@okklusion.com";
  const password = process.env.CMS_SUPER_ADMIN_PASSWORD ?? "okklusion-cms-2024";

  const bcrypt = await import("bcryptjs");
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.cmsUser.create({
    data: { email, passwordHash, name: "Finn", role: "super_admin" },
  });
}
