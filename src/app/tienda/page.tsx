import StoreComponent from "@/components/store/storeComponent";
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal";
import { AnnouncementService } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tienda Oficial - Luis Carlos Gago | Vinilos, Ropa y Merchandising Mariachi',
  description: 'Tienda oficial de Luis Carlos Gago. Encuentra vinilos de música mariachi, ropa exclusiva, instrumentos y merchandising auténtico. Envíos a todo México. Productos originales de alta calidad.',
  keywords: [
    'tienda mariachi',
    'vinilos mexicanos',
    'merchandising mariachi',
    'ropa mariachi',
    'Luis Carlos Gago tienda',
    'música tradicional mexicana',
    'instrumentos mariachi',
    'coleccionables mariachi',
    'ropa mexicana',
    'tienda oficial mariachi'
  ],
  openGraph: {
    title: 'Tienda Oficial | Luis Carlos Gago',
    description: 'Descubre la colección oficial de Luis Carlos Gago: vinilos de música mariachi, ropa exclusiva, instrumentos y merchandising auténtico.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mariachi-web-v3.vercel.app'}/tienda`,
    siteName: 'Luis Carlos Gago',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mariachi-web-v3.vercel.app'}/og-tienda.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tienda Oficial Luis Carlos Gago',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tienda Oficial | Luis Carlos Gago',
    description: 'Vinilos, ropa exclusiva y merchandising de música mariachi auténtica.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mariachi-web-v3.vercel.app'}/tienda`,
  },
};

export default async function tiendaPage() {
  const announcement = await AnnouncementService.getForPage('tienda')

  return (
    <div>
      <AnnouncementModalWrapper announcement={announcement} />
      <StoreComponent/>
    </div>
  )
}