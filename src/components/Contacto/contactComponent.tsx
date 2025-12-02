export default function ContactComponent() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-light text-center mb-20 tracking-[0.2em] uppercase">Luis Carlos Gago</h1>

        {/* Contact Information */}
        <div className="space-y-12 text-center">
          {/* Management */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">Management:</h2>
            <p className="text-base md:text-lg font-light tracking-wide">Michelle Cable</p>
            <a
              href="mailto:michelle@panacherock.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              michelle@panacherock.com
            </a>
          </div>

          {/* North American Booking */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">
              North American Booking:
            </h2>
            <p className="text-base md:text-lg font-light tracking-wide">Michelle Cable</p>
            <a
              href="mailto:michelle@panacherock.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              michelle@panacherock.com
            </a>
          </div>

          {/* US Press */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">US Press:</h2>
            <p className="text-base md:text-lg font-light tracking-wide">Jessica Linker</p>
            <a
              href="mailto:jessica@pitchperfectpr.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              jessica@pitchperfectpr.com
            </a>
          </div>

          {/* US Radio */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">US Radio:</h2>
            <p className="text-base md:text-lg font-light tracking-wide">Jennifer Daunt</p>
            <a
              href="mailto:dauntless2@earthlink.net"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              dauntless2@earthlink.net
            </a>
          </div>

          {/* European Booking */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">
              European Booking:
            </h2>
            <p className="text-base md:text-lg font-light tracking-wide">Clemence Renaut</p>
            <a
              href="mailto:clemence.renaut@roamartists.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              clemence.renaut@roamartists.com
            </a>
          </div>

          {/* UK Press */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">UK Press:</h2>
            <p className="text-base md:text-lg font-light tracking-wide">Jodie Banaszkiewicz</p>
            <a
              href="mailto:jodie@staygoldenpr.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              jodie@staygoldenpr.com
            </a>
          </div>

          {/* UK Radio */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">UK Radio:</h2>
            <p className="text-base md:text-lg font-light tracking-wide">Ewan Hall</p>
            <a
              href="mailto:ewan@peergroupmusic.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              ewan@peergroupmusic.com
            </a>
          </div>

          {/* Canada Press */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">Canada Press:</h2>
            <p className="text-base md:text-lg font-light tracking-wide">Paul Brooks</p>
            <a
              href="mailto:paul@takeaimmedia.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              paul@takeaimmedia.com
            </a>
          </div>

          {/* All Other Regions Press */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">
              All Other Regions Press:
            </h2>
            <p className="text-base md:text-lg font-light tracking-wide">Michelle Cable</p>
            <a
              href="mailto:michelle@panacherock.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              michelle@panacherock.com
            </a>
          </div>

          {/* General Inquiries */}
          <div className="space-y-2 pt-8">
            <h2 className="text-sm md:text-base tracking-[0.15em] uppercase font-light text-gray-400">
              General inquiries:
            </h2>
            <a
              href="mailto:info@mac-demarco.com"
              className="text-base md:text-lg font-light tracking-wide text-[#d4a574] hover:text-white transition-colors duration-300 inline-block"
            >
              info@LuisCarlos-Gago.com
            </a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-8 mt-20 mb-12">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#d4a574] transition-colors duration-300"
            aria-label="YouTube"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Spotify"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>
          <a
            href="https://music.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Apple Music"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.595-.71 10.48 10.48 0 0 0-1.88-.174c-1.777-.03-3.555-.03-5.333 0-.46.01-.917.028-1.375.062-.76.056-1.51.175-2.24.43a5.487 5.487 0 0 0-2.18 1.466 5.654 5.654 0 0 0-1.11 1.693 9.446 9.446 0 0 0-.533 2.18c-.096.76-.096 1.53-.096 2.29-.01 1.81-.01 3.62 0 5.43.006.76.04 1.53.14 2.28a5.506 5.506 0 0 0 .536 1.81c.435.793 1.026 1.44 1.77 1.94.74.498 1.56.79 2.43.92.46.07.92.11 1.38.13 1.78.05 3.56.05 5.34 0 .46-.01.92-.03 1.38-.08.76-.08 1.51-.24 2.23-.55a5.44 5.44 0 0 0 2.18-2.18c.42-.75.65-1.58.74-2.44.05-.46.07-.93.08-1.39.03-1.78.03-3.56 0-5.34-.01-.46-.03-.92-.07-1.38zm-3.14 10.74c-.11.41-.29.78-.54 1.11a2.94 2.94 0 0 1-1.11.84c-.46.22-.96.33-1.47.38-.76.08-1.53.1-2.29.1-1.59 0-3.18.01-4.77 0-.46 0-.92-.02-1.38-.06a4.14 4.14 0 0 1-1.52-.4 2.89 2.89 0 0 1-1.11-.86 3.34 3.34 0 0 1-.58-1.2c-.13-.45-.18-.92-.2-1.38-.03-.76-.03-1.53-.03-2.29 0-1.59-.01-3.18 0-4.77 0-.46.02-.92.06-1.38.04-.5.13-1 .32-1.47.19-.47.47-.88.83-1.23.35-.35.76-.62 1.21-.81.45-.19.93-.29 1.42-.32.76-.05 1.52-.06 2.28-.06 1.59 0 3.18-.01 4.77 0 .46 0 .92.02 1.38.06.96.09 1.87.38 2.66.97.39.29.72.65.97 1.07.25.42.41.88.49 1.36.08.5.11 1 .11 1.51.01 1.59.01 3.18 0 4.77 0 .46-.02.92-.06 1.38z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
