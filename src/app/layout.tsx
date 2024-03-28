import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import DappKitProvider from "@/components/DappKitProvider";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Reise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <DappKitProvider>
          <Navbar />
          {children}
        </DappKitProvider>
        </body>
      </html>
  );
}
