import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/theme-provider";
import AuthProvider from "@/components/providers";
import QueryClientProvider from "@/components/QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheVybe",
  description:
    "TheVybe brings you the latest headlines, insightful reports, and global coverage in real time. Stay ahead with stories that inform, inspire, and connect the world.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen m-0`}
      >
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        ></Script>
        <Script>
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', ${process.env.GA_TRACKING_ID});
  `}
        </Script>
        <Script
          id="usercentrics-cmp"
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          data-settings-id="AwOkxTBL_bVgHd"
          async
        ></Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <QueryClientProvider>
              <main className="grow">{children}</main>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
