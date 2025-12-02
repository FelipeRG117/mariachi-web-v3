import { DiscographyContainer } from "@/components"
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal"
import DataService from "@/lib/data"

export default async function Discografia() {
  const announcement = await DataService.getAnnouncementForPage('discografia')

  return (
    <div className="bg-[#1a1a1a]">
      <AnnouncementModalWrapper announcement={announcement} />
      <DiscographyContainer />
    </div>
  )
}
