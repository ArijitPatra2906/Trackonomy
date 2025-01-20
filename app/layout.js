import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trackonomy",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>
                Built with dedication and collaboration by{" "}
                <strong>
                  Arijit Patra, Swarup Paul, Ayan Maity, Shibasish Sharmadhikary
                </strong>
              </p>
              <p>
                Presented as part of the <strong>Minor Project</strong> at{" "}
                <strong>Techno India University</strong>
              </p>
              <p>© 2025 All rights reserved</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
