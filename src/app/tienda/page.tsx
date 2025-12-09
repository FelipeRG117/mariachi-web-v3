import StoreComponent from "@/components/store/storeComponent";
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal";
import { AnnouncementService } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Descubre la colección oficial de Luis Carlos Gago: vinilos de música mariachi, ropa exclusiva y merchandising. Envíos a todo México.',
  keywords: ['tienda mariachi', 'vinilos mexicanos', 'merchandising mariachi', 'ropa mariachi', 'Luis Carlos Gago tienda'],
  openGraph: {
    title: 'Tienda | Luis Carlos Gago',
    description: 'Descubre la colección oficial de Luis Carlos Gago: vinilos de música mariachi, ropa exclusiva y merchandising.',
    type: 'website',
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