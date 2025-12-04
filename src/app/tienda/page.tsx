import StoreComponent from "@/components/store/storeComponent";
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal";
import { AnnouncementService } from "@/lib/services";

export default async function tiendaPage() {
  const announcement = await AnnouncementService.getForPage('tienda')

  return (
    <div>
      <AnnouncementModalWrapper announcement={announcement} />
      <StoreComponent/>
    </div>
  )
}