import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

function scoreColour(score: number) {
  if (score >= 70) return "text-green-700 bg-green-100";
  if (score >= 50) return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

function scoreLabel(score: number) {
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs Work";
  return "Weak";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: audits } = await supabase
    .from("audits")
    .select("id, created_at, url, practice_name, overall_score")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen flex flex-col bg-tio-light">
      {/* Header */}
      <header className="bg-tio-navy px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <Image
          src="/tio-logo.svg"
          alt="the invisible orthodontist"
          width={130}
          height={50}
          className="brightness-0 invert"
        />
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-xs hidden sm:block">{user.email}</span>
          <Link
            href="/api/auth/logout"
            className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign out
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-tio-navy">My Audits</h1>
          <Link
            href="/"
            className="bg-tio-navy text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            + New audit
          </Link>
        </div>

        {!audits || audits.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-tio-blue shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-tio-light flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-tio-navy opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-tio-navy mb-2">No audits yet</h2>
            <p className="text-sm text-gray-500 mb-6">
              Run your first audit below to see results here.
            </p>
            <Link
              href="/"
              className="inline-block bg-tio-navy text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Run your first audit
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-tio-blue shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Practice</span>
              <span className="text-right">Score</span>
              <span className="text-right">Date</span>
              <span />
            </div>

            <ul className="divide-y divide-gray-100">
              {audits.map((audit) => (
                <li key={audit.id}>
                  <Link
                    href={`/audit/${audit.id}`}
                    className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto] gap-2 sm:gap-4 px-6 py-4 items-start sm:items-center hover:bg-tio-light transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-tio-navy group-hover:underline text-sm">
                        {audit.practice_name || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{audit.url}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto ${scoreColour(audit.overall_score)}`}
                    >
                      {audit.overall_score}/100 · {scoreLabel(audit.overall_score)}
                    </span>
                    <span className="text-xs text-gray-400 self-start sm:self-auto">
                      {formatDate(audit.created_at)}
                    </span>
                    <svg
                      className="hidden sm:block w-4 h-4 text-gray-300 group-hover:text-tio-navy transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
