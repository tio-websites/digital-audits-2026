import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ArticleEditor from "../ArticleEditor";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  let body: unknown[] = [];
  try { body = JSON.parse(article.body); } catch { body = []; }

  return (
    <div style={{ padding: "48px", maxWidth: "1200px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link
          href="/cms/articles"
          style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A8C84", textDecoration: "none", marginBottom: "16px" }}
        >
          <ChevronLeft size={12} /> Articles
        </Link>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "#1A2E24", letterSpacing: "-0.01em" }}>
          Edit article
        </h1>
        <p style={{ fontSize: "12px", color: "#7A8C84", marginTop: "4px", fontFamily: "monospace" }}>{article.slug}</p>
      </div>
      <ArticleEditor
        articleId={article.id}
        initial={{
          slug: article.slug,
          dept: article.dept,
          deptSlug: article.deptSlug,
          title: article.title,
          excerpt: article.excerpt,
          author: article.author,
          authorRole: article.authorRole ?? "",
          date: article.date,
          readTime: article.readTime,
          issue: article.issue,
          published: article.published,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          body: body as any,
        }}
      />
    </div>
  );
}
