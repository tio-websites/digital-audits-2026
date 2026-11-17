import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";
import { articles } from "../lib/articles";

const dbUrl = "file:" + path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaLibSql({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding articles…");

  for (const a of articles) {
    const existing = await prisma.article.findUnique({ where: { slug: a.slug } });
    if (existing) {
      console.log(`  skip (exists): ${a.slug}`);
      continue;
    }
    await prisma.article.create({
      data: {
        slug: a.slug,
        dept: a.dept,
        deptSlug: a.deptSlug,
        title: a.title,
        excerpt: a.excerpt,
        author: a.author,
        authorRole: a.authorRole ?? "",
        date: a.date,
        readTime: a.readTime,
        issue: a.issue,
        body: JSON.stringify(a.body),
        published: true,
      },
    });
    console.log(`  created: ${a.slug}`);
  }

  await prisma.$disconnect();
  console.log("Done.");
}

main().catch(e => { console.error(e); process.exit(1); });
