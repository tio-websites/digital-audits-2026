import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { AuditResult } from "@/app/api/audit/types";
import AuditResultsWrapper from "./AuditResultsWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("audits")
    .select("practice_name")
    .eq("id", id)
    .single();

  if (!data) return { title: "Audit — Digital Audit Tool" };
  return { title: `${data.practice_name} — Digital Audit` };
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <AuditResultsWrapper
      result={data.result as AuditResult}
      auditId={id}
    />
  );
}
