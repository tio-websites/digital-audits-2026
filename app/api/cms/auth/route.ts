import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signCmsToken } from "@/lib/cms-auth";
import { ensureSuperAdmin } from "@/lib/cms-auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // Logout
  if (body._action === "logout") {
    const res = NextResponse.redirect(new URL("/cms/login", req.url));
    res.cookies.delete("cms_session");
    return res;
  }

  // Login
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  await ensureSuperAdmin();

  const user = await prisma.cmsUser.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await prisma.cmsUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  const token = await signCmsToken({ id: user.id, email: user.email, name: user.name, role: user.role as "super_admin" | "editor" });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("cms_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
