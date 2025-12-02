import StoreComponent from "@/components/store/storeComponent";
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal";
import DataService from "@/lib/data";

export default async function tiendaPage() {
  const announcement = await DataService.getAnnouncementForPage('tienda')

  return (
    <div>
      <AnnouncementModalWrapper announcement={announcement} />
      <StoreComponent/>
    </div>
  )
}