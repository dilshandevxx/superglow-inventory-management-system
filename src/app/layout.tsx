import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperGlow Cloud ERP",
  description: "Modern cloud ERP system for SuperGlow Trade Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
