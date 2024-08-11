import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from "@/components/shared/dashboard-layout";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster />
        <SonnerToaster richColors />
      </ThemeProvider>
    </>
  );
}
