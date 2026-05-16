import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WealthAI",
  description: "Your Personal Finance Companion",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-blue-50 py-12 border-t">
  <div className="container mx-auto px-4">
    

    {/* Bottom */}
    <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} WealthAI. All rights reserved.
    </div>
    
  </div>
</footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
