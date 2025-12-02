import DataService from "@/lib/data";
import { NextConcertsList } from ".";

export default async function NextConcertsComponentContainer() {
  const concerts = await DataService.getConcerts()

  return (
    <div className="w-full min-h-screen bg-[#e8e6e1] text-black">
      <div className="w-full py-12 text-center border-b border-black/10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Tour</h1>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12">
        {concerts.length === 0 ? (
          <div className="text-center mt-12 space-y-4">
            <p className="text-base sm:text-lg text-black/70">No hay conciertos próximos.</p>
          </div>
        ) : (
          <NextConcertsList concerts={concerts} />
        )}

        <div className="mt-16 pt-12 border-t border-black/10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-base md:text-lg text-black/80">
              Get notified when new events are announced in your area
            </p>
            <button className="px-8 py-3 text-sm font-medium tracking-wide uppercase bg-black text-white hover:bg-black/80 transition-colors">
              Follow Luis Carlos Gago
            </button>
          </div>
        </div>
      </div>

      <div className="w-full py-6 mt-16 border-t border-black/10">
  
      </div>
    </div>
  )
}






