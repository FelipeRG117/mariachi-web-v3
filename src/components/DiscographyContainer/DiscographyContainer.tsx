import DataService from "@/lib/data"
import { AlbumCard, SectionBanner } from "@/components/DiscographyContainer/components"

export default async function DiscographyContainer() {
  const albums = await DataService.getAlbums()

  return (
    <div className="bg-[#1a1a1a]">
      {/* Banner Section */}
      <section>
        <div className="w-full">
          <SectionBanner title="DISCOGRAFIA" imageUrl="/images/1.jpg" imgAlt="Fondo discografía" />
        </div>
      </section>

      {/* Albums Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.2em] mb-4 uppercase">Álbumes</h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
