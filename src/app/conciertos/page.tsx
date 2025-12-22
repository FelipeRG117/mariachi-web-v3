import { ConcertService, AnnouncementService } from "@/lib/services"
import NextConcertsList from "@/components/NextConcertsList"
import { AnnouncementModalWrapper } from "@/components/AnnouncementModal"
import Link from "next/link"

export default async function ConcertsPage() {
  const concerts = await ConcertService.getUpcoming()
  const announcement = await AnnouncementService.getForPage('conciertos')



  return (
    <div className="w-full min-h-screen bg-[#e8e6e1] text-black">
      <AnnouncementModalWrapper announcement={announcement} />
      <div className="max-w-6xl mx-auto px-8 py-16 sm:py-20 md:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight">Luis Carlos Gago</h1>
        <p className="text-center text-sm tracking-[0.3em] uppercase text-black/60 mb-16">Tour Dates</p>

        <div className="mb-16">
          <NextConcertsList concerts={concerts} />
        </div>

        <div className="border-t border-black/10 pt-12 pb-8 text-center">
          <p className="text-sm text-black/70 mb-6 tracking-wide">
            Get notified when new events are announced in your area
          </p>
          <button className="px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase border border-black hover:bg-black hover:text-white transition-all duration-300">
            Follow Luis Carlos Gago
          </button>
        </div>

        <div className="text-center pt-8 border-t border-black/10">
          <Link href="/" className="text-xs tracking-wide text-black/50 hover:text-black transition-colors uppercase">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

/*       <section>
        <div className="w-full ">
          <SectionBanner
            title="Tour"
            imageUrl="/images/1.jpg"
            imgAlt="Fondo discografía"
          />
        </div>
      </section> */
