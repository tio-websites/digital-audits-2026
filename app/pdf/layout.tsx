export default function PDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Inter, Arial, sans-serif; background: #fff; width: 210mm; }

          /* Each major section forces a new page when printing */
          .pdf-section {
            padding: 24px 40px;
            break-after: page;
            page-break-after: always;
          }
          .pdf-section-last {
            padding: 24px 40px;
          }

          @media print {
            /* Reserve 62px top and 36px bottom on every page for the fixed header/footer */
            @page { size: A4 portrait; margin: 62px 0 36px 0; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

            /* Pin header and footer to the physical page edges — repeats on every page */
            .pdf-header {
              position: fixed;
              top: 0; left: 0; right: 0;
              z-index: 1000;
            }
            .pdf-footer {
              position: fixed;
              bottom: 0; left: 0; right: 0;
              z-index: 1000;
            }
          }
        `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
