import Image from "next/image"
import NavBar from "../NavBar/NavBar";


const SectionBanner = ({ title, imageUrl, imgAlt }: { title: string; imageUrl: string; imgAlt: string }) => {
  return (
    <div className="bg-black">
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background image - now using object-contain to show full image */}
        <Image src={imageUrl || "/placeholder.svg"} alt={imgAlt} fill className="object-contain" priority />

        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* NavBar */}
        <div className="absolute top-0 left-0 w-full z-30">
          <NavBar/>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.3em] uppercase">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default SectionBanner
