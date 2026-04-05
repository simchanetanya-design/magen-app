import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "מגן — מדריך תמיכה מקצועי",
  description: "פגיעות מיניות בילדים | להורים · מטפלים · צוות חינוכי",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
