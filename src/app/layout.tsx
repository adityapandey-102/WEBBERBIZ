import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SurveyProvider } from "@/components/SurveyModal";
import { company } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Heavy geometric sans for the product showcase display word.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webberbiz.example"),
  title: {
    default: `${company.short} — Nanotechnology thermal coating & waterproofing`,
    template: `%s — ${company.short}`,
  },
  description:
    "Webberbiz Trading LLC supplies nanotechnology-based ceramic composite thermal coating and waterproofing for metal and concrete surfaces across the UAE and GCC. Roof temperature reductions of 24°C to 30°C.",
  openGraph: {
    title: `${company.name} — Aligning to sustainability`,
    description: "Nanotechnology-based thermal coating and waterproofing for the UAE and GCC.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${poppins.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-body">
        <SurveyProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </SurveyProvider>
      </body>
    </html>
  );
}
