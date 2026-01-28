import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Remnant | Africa's C2C Marketplace for Single Items",
    template: "%s | Remnant",
  },
  description: "Buy, sell, and trade single items, mismatched pairs, and unwanted products. Join Africa's first circular economy marketplace.",
  keywords: ["marketplace", "C2C", "Nigeria", "Africa", "secondhand", "sustainable", "circular economy", "single items"],
  authors: [{ name: "Remnant Team" }],
  creator: "Remnant",
  publisher: "Remnant Marketplace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://remnant.africa"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "fr-FR": "/fr-FR",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://remnant.africa",
    title: "Remnant | Africa's C2C Marketplace",
    description: "Connect with buyers and sellers of single items across Africa",
    siteName: "Remnant",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Remnant Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remnant | Africa's C2C Marketplace",
    description: "Buy, sell, and trade single items across Africa",
    images: ["/twitter-image.png"],
    creator: "@remnant_market",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Remnant",
    "alternateName": "Remnant Marketplace",
    "url": "https://remnant.africa",
    "description": "Africa's premier C2C marketplace for single items and mismatched products",
    "publisher": {
      "@type": "Organization",
      "name": "Remnant",
      "logo": {
        "@type": "ImageObject",
        "url": "https://remnant.africa/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://remnant.africa/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html 
      lang="en" 
      className={`${inter.className} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Viewport for mobile responsiveness */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" 
        />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.remnant.africa" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
      </head>
      
      <body className="flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        
        {/* Progress bar for page transitions */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 z-[60] progress-bar" />
        
        {/* Navbar with safe area support */}
        <div className="safe-top">
          <Navbar />
        </div>
        
        {/* Main content */}
        <main 
          id="main-content" 
          className="flex-grow container-mobile mx-auto pt-6 pb-12 md:pt-8 md:pb-16"
        >
          {children}
        </main>
        
        {/* Footer with safe area support */}
        <div className="safe-bottom">
          <Footer />
        </div>
        
        {/* Mobile navigation padding (for fixed footer on mobile) */}
        <div className="lg:hidden h-16" />
        
        {/* Service worker registration for PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}