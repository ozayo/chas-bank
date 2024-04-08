"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="container mx-auto max-w-3xl px-2">
            <Header />
              <main>
                {children}
              </main>
              <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
