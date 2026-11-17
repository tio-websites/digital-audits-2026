import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCmsSession } from "@/lib/cms-auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireCmsSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  if (id === session.id) {
    return NextResponse.json({ error: "You cannot remove your own account" }, { status: 400 });
  }

  const user = await prisma.cmsUser.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.role === "super_admin") {
    return NextResponse.json({ error: "Super admins cannot be removed" }, { status: 400 });
  }

  await prisma.cmsUser.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
