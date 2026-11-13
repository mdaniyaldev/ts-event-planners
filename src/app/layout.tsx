import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site } from "@/lib/site";
import "./globals.css";

// Headlines: a high-contrast garamond with a true italic, the kind used on wedding stationery.
const cormorant = Cormorant_Garamond({
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

// Body: a geometric sans with even strokes that sits quietly next to the serif.
const jost = Jost({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

// Runs before the first paint: puts a saved theme choice on <html> so a dark-theme visitor never sees a white flash.
// With no saved choice nothing is set and the CSS follows the system setting. (See ThemeToggle.)
const themeScript = `try{var t=localStorage.getItem("ts-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the script above may add data-theme to <html> before React hydrates.
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
