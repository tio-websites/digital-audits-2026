import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCmsSession } from "@/lib/cms-auth";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const session = await requireCmsSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const session = await requireCmsSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { slug, dept, deptSlug, title, excerpt, author, authorRole, date, readTime, issue, published, body: articleBody } = body;

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Check slug uniqueness if changed
  if (slug && slug !== existing.slug) {
    const conflict = await prisma.article.findUnique({ where: { slug } });
    if (conflict) return NextResponse.json({ error: "An article with that slug already exists" }, { status: 409 });
  }

  const article = await prisma.article.update({
    where: { id },
    data: {
      ...(slug !== undefined && { slug }),
      ...(dept !== undefined && { dept }),
      ...(deptSlug !== undefined && { deptSlug }),
      ...(title !== undefined && { title }),
      ...(excerpt !== undefined && { excerpt }),
      ...(author !== undefined && { author }),
      ...(authorRole !== undefined && { authorRole }),
      ...(date !== undefined && { date }),
      ...(readTime !== undefined && { readTime }),
      ...(issue !== undefined && { issue }),
      ...(published !== undefined && { published }),
      ...(articleBody !== undefined && { body: JSON.stringify(articleBody) }),
    },
  });

  return NextResponse.json({ ok: true, id: article.id });
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const session = await requireCmsSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const article = await prisma.article.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({ ok: true, published: article.published });
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const session = await requireCmsSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
