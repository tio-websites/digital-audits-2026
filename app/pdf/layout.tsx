export default function PDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
