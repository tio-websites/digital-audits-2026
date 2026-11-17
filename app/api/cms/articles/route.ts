import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCmsSession } from "@/lib/cms-auth";

export async function GET() {
  const session = await requireCmsSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const session = await requireCmsSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { slug, dept, deptSlug, title, excerpt, author, authorRole, date, readTime, issue, published, body: articleBody } = body;

  if (!slug || !title || !dept) {
    return NextResponse.json({ error: "slug, title and dept are required" }, { status: 400 });
  }

  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "An article with that slug already exists" }, { status: 409 });
  }

  const article = await prisma.article.create({
    data: {
      slug,
      dept,
      deptSlug: deptSlug ?? "",
      title,
      excerpt: excerpt ?? "",
      author: author ?? "Finn",
      authorRole: authorRole ?? "",
      date: date ?? new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      readTime: readTime ?? "5 min",
      issue: issue ?? "",
      published: published ?? false,
      body: JSON.stringify(articleBody ?? []),
    },
  });

  return NextResponse.json({ ok: true, id: article.id }, { status: 201 });
}
