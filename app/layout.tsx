import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ConvexClientProvider from "@/provider/convexClientProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "@/components/ui/theme/Theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex items-center justify-center h-screen ${inter.className}`}>
          
            <ThemeProvider  attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
        <ConvexClientProvider>
          <TooltipProvider>
             {children}
             </TooltipProvider>
             <Toaster richColors />
        </ConvexClientProvider>
             </ThemeProvider>
        </body>
    </html>
  );
}
