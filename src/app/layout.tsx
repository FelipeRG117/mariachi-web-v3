import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Inter, Yusei_Magic, Playfair_Display_SC } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components";
import FooterComponent from "@/components/FooterComponent";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://luiscarlosgago.com'),
  title: {
    default: 'Luis Carlos Gago | Mariachi Mexicano',
    template: '%s | Luis Carlos Gago'
  },
  description: 'Tienda oficial de Luis Carlos Gago. Música de mariachi mexicano, vinilos exclusivos, merchandising y más. Descubre la auténtica música tradicional mexicana.',
  keywords: ['Luis Carlos Gago', 'mariachi', 'música mexicana', 'vinilos', 'merchandising', 'mariachi mexicano', 'música tradicional', 'tienda oficial'],
  authors: [{ name: 'Luis Carlos Gago' }],
  creator: 'Luis Carlos Gago',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: 'Luis Carlos Gago',
    title: 'Luis Carlos Gago | Mariachi Mexicano',
    description: 'Tienda oficial de Luis Carlos Gago. Música de mariachi mexicano, vinilos exclusivos y merchandising.',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image later
        width: 1200,
        height: 630,
        alt: 'Luis Carlos Gago - Mariachi Mexicano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luis Carlos Gago | Mariachi Mexicano',
    description: 'Tienda oficial de Luis Carlos Gago. Música de mariachi mexicano, vinilos exclusivos y merchandising.',
    images: ['/og-image.jpg'], // You'll need to add this image later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here after setup
    // google: 'your-verification-code',
  },
};

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const yusei_magic = Yusei_Magic({
    subsets: ['latin'],
    weight: ['400'],
  variable: '--font-yusei-magic', 
});

const playfair_display_sc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playfair-display-sc',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
         className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable} ${inter.variable} ${yusei_magic.variable} ${playfair_display_sc.variable} antialiased`}
      >
        {/*<NavBar />*/}
        
      {/* NavBar */}
   
      {/* NavBar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <NavBar />
      </div>
        {children}
       <FooterComponent/>
      </body>
    </html>
  );
}
