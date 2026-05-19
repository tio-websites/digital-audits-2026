import PlatformSidebar from "@/components/PlatformSidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      <PlatformSidebar />
      <main style={{ flex: 1, overflowY: "auto" as const }}>
        {children}
      </main>
    </div>
  );
}
