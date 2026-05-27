"use client";

import { useRouter } from "next/navigation";
import AuditResults from "@/app/components/AuditResults";
import type { AuditResult } from "@/app/api/audit/types";

interface Props {
  result: AuditResult;
  auditId: string;
}

export default function AuditResultsWrapper({ result, auditId }: Props) {
  const router = useRouter();
  return (
    <AuditResults
      result={result}
      auditId={auditId}
      onReset={() => router.push("/")}
    />
  );
}
