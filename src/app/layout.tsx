import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intern-Setu - Government Internships",
  description: "AI-powered platform to find perfect government internships",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Intern-Setu",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#2E6CF6",
  minimumScale: 1,
  shrinkToFit: "no",
  interactive: true
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-inter bg-app-background text-foreground min-h-screen overflow-x-hidden">
        <div className="min-h-screen w-full max-w-[390px] mx-auto relative bg-grid-pattern">
          {children}
        </div>
      </body>
    </html>
  );
}