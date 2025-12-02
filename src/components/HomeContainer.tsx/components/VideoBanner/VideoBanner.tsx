import Link from "next/link"
import { Bebas_Neue, Ysabeau_SC } from "next/font/google"


const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const ysabeau_sc = Ysabeau_SC({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const VideoBanner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube-nocookie.com/embed/vRcbywAlQhM?autoplay=1&mute=1&loop=1&playlist=vRcbywAlQhM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1`}
          title="YouTube video background"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="absolute inset-0 bg-black/20 z-10"></div>


      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 px-4">
          <h1
            className={`${ysabeau_sc.className} text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] uppercase text-center`}
          >
            Bienvenido
          </h1>

          <Link
            className={`${bebas_neue.className} text-white text-xl md:text-2xl tracking-[0.3em] uppercase border border-white px-12 md:px-16 py-3 md:py-4 hover:bg-white hover:text-black transition-all duration-300 ease-in-out`}
            href="/#welcome-section"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoBanner
