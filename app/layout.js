import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trackonomy - One stop Finance Platform",
  description:
    "It is an advanced personal finance app that leverages AI-powered insights to help users take full control of their financial well-being. It enables effortless tracking of daily expenses, automatic categorization for insightful analysis, and real-time monitoring of savings progress toward specific financial goals. Users can set dynamic budgets, receive intelligent spending alerts, and visualize their financial health with interactive charts. The app also provides predictive analytics and future financial projections, allowing users to plan effectively for long-term financial stability. With its modern UI, seamless authentication, and powerful features, Trackonomy simplifies financial management and fosters better financial habits.",
  keywords: ["Money", "Tracker", "Expence Tracker", "Budget Tracker"],
  authors: [{ name: "Arijit Patra" }],
  creator: "Arijit Patra",
  publisher: "Arijit Patra",
  formatDetection: {
    email: "arijitpatra.online@gmail.com",
    address: "Kolkata",
    telephone: "+91 6291273442",
  },
  openGraph: {
    title: "Trackonomy - One stop Finance Platform",
    description:
      "It is an advanced personal finance app that leverages AI-powered insights to help users take full control of their financial well-being. It enables effortless tracking of daily expenses, automatic categorization for insightful analysis, and real-time monitoring of savings progress toward specific financial goals. Users can set dynamic budgets, receive intelligent spending alerts, and visualize their financial health with interactive charts. The app also provides predictive analytics and future financial projections, allowing users to plan effectively for long-term financial stability. With its modern UI, seamless authentication, and powerful features, Trackonomy simplifies financial management and fosters better financial habits.",
    url: "https://trackonomy.vercel.app/",
    siteName: "Trackonomy",
    images: [
      {
        url: "https://trackonomy.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trackonomy - One stop Finance Platform",
    description:
      "It is an advanced personal finance app that leverages AI-powered insights to help users take full control of their financial well-being. It enables effortless tracking of daily expenses, automatic categorization for insightful analysis, and real-time monitoring of savings progress toward specific financial goals. Users can set dynamic budgets, receive intelligent spending alerts, and visualize their financial health with interactive charts. The app also provides predictive analytics and future financial projections, allowing users to plan effectively for long-term financial stability. With its modern UI, seamless authentication, and powerful features, Trackonomy simplifies financial management and fosters better financial habits.",
    images: ["https://trackonomy.vercel.app/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
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
