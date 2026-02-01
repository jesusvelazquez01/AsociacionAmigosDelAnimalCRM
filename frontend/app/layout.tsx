import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { CookieConsent } from "@/components/cookies/cookie";

// Fuente para títulos (estilo Furs - Serif elegante)
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// Fuente para cuerpo (estilo Furs - Sans-serif geométrica)
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amigos del Animal | Asociación Protectora - San Salvador de Jujuy",
  description: "Asociación Amigos del Animal - Rescatamos, cuidamos y encontramos hogares para animales abandonados en San Salvador de Jujuy, Argentina. Adopta, no compres.",
  keywords: "adopción, mascotas, perros, gatos, rescate animal, Jujuy, Argentina, protectora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent demo={true} />
      </body>
    </html>
  );
}


