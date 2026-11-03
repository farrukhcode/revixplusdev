import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { MobileDock } from "@/components/layout/MobileDock";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress, TourProvider } from "@/components/motion/StoryTour";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name}: Software, AI and Growth Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "software agency",
    "AI integration agency",
    "HIPAA compliant AI agents",
    "web development",
    "mobile app development",
    "Shopify development",
    "game development",
    "SEO agency",
    "AI engine optimization",
    "social media marketing",
  ],
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Saved choice wins, then the OS setting. Runs in <head> before first paint (no flash).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export const viewport: Viewport = {
  // Mirrors --background in globals.css (meta tags can't read CSS variables)
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6fb" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap, no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {/* Alpha threshold for the CSS gooey reveal (.goo-load in globals.css) */}
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <filter id="goo-load" x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </svg>
        <SmoothScroll>
          <TourProvider>
            <ScrollProgress />
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <MobileDock />
          </TourProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
