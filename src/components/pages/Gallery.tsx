import NavBar from "@/components/NavBar/NavBar"
import DataService from "@/lib/data"
import Image from "next/image"
import VideoGalleryContainer from "@/components/VideoGalleryContainer"

export default async function Gallery() {
  const videos = await DataService.getVideosGallery()

  return (
    <div className="bg-black min-h-screen">
      <section>
        <div className="w-full bg-black">
          <NavBar />
        </div>
      </section>

      <section className="py-16 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            <div className="flex justify-center">
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] uppercase">
                GALERÍA
              </h1>
            </div>
            <div>
              <GridPicturesGallery />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            <div className="flex justify-center">
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] uppercase">
                VIDEOS
              </h1>
            </div>
            <div>
              <VideoGalleryContainer videosList={videos} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const GridPicturesGallery = async () => {
  const pictures = await DataService.getPicturesGallery()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pictures.map((item, index) => {
        return <PictureCard imageUrl={item} alt={"picture"} key={index} />
      })}
    </div>
  )
}

const PictureCard = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  return (
    <div className="relative aspect-square overflow-hidden group cursor-pointer">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={alt}
        fill={true}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </div>
  )
}
