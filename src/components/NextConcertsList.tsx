"use client"

import { Concert } from "@/lib/data/concerts"

export default function NextConcertsList({ concerts }: { concerts: Concert[] }) {
  return (
    <div className="w-full space-y-0">
      {concerts.map((concert, index) => (
        <ConcertCard key={index} concert={concert} />
      ))}
    </div>
  )
}

const ConcertCard = ({ concert }: { concert: Concert }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[240px_1fr_160px] gap-6 items-center py-6 border-b border-black/10 last:border-b-0 hover:bg-black/[0.02] transition-colors">
      {/* Left: Date and Venue */}
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold tracking-wide uppercase">{concert.date}</span>
        <span className="text-sm text-black/60 tracking-wide">{concert.venue}</span>
      </div>

      {/* Center: City and Country */}
      <div className="text-center">
        <span className="text-base tracking-wide">
          {concert.city}, {concert.country}
        </span>
      </div>

      {/* Right: Ticket Button */}
      <div className="flex justify-center md:justify-end">
        {concert.soldOut ? (
          <button
            disabled
            className="px-6 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase bg-black/5 text-black/30 cursor-not-allowed border border-black/10"
          >
            SOLD OUT
          </button>
        ) : (
          <a
            href={concert.ticketUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase border border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            TICKETS
          </a>
        )}
      </div>
    </div>
  )
}
