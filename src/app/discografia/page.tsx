import { DiscographyContainer } from "@/components"
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal"
import { AnnouncementService } from "@/lib/services"

export default async function Discografia() {
  const announcement = await AnnouncementService.getForPage('discografia')

  return (
    <div className="bg-[#1a1a1a]">
      <AnnouncementModalWrapper announcement={announcement} />
      <DiscographyContainer />
    </div>
  )
}
