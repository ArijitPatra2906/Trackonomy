import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trackonomy",
  description: "One stop Finance Platform",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Arijit Patra",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/android-chrome-192x192.png" },
    { rel: "icon", url: "icons/android-chrome-192x192.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
          <meta
            property="og:image"
            content="https://trackonomy.vercel.app/logo-1200x630.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:title"
            content="Trackonomy - One stop Finance Platform"
          />
          <meta
            property="og:description"
            content="Manage your finances seamlessly with Trackonomy."
          />
          <meta property="og:url" content="https://trackonomy.vercel.app" />
          <meta property="og:type" content="website" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💗 by Arijit</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
