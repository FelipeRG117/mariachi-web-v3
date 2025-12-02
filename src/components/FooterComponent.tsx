import Link from "next/link"
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react"

export default function FooterComponent() {
  return (
    <footer className="w-full bg-black text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-8 mb-16">
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4a574] transition-colors duration-300"
            aria-label="YouTube"
          >
            <Youtube className="w-7 h-7" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7" />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4a574] transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter className="w-7 h-7" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="mb-16">
          <ul className="flex items-center justify-center gap-12 text-sm tracking-widest">
            <li>
              <Link href="/" className="hover:text-[#d4a574] transition-colors duration-300 uppercase font-light">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/concerts"
                className="hover:text-[#d4a574] transition-colors duration-300 uppercase font-light"
              >
                Tour
              </Link>
            </li>
            <li>
              <Link
                href="/galeria"
                className="hover:text-[#d4a574] transition-colors duration-300 uppercase font-light"
              >
                Galería
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-[#d4a574] transition-colors duration-300 uppercase font-light">
                Videos
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#d4a574] transition-colors duration-300 uppercase font-light"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mb-12" />

        {/* Copyright and Legal */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-8 text-xs tracking-wide text-gray-400">
            <Link href="/privacy" className="hover:text-[#d4a574] transition-colors duration-300 uppercase">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#d4a574] transition-colors duration-300 uppercase">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#d4a574] transition-colors duration-300 uppercase">
              Cookies
            </Link>
          </div>

          <div className="text-xs text-gray-500 tracking-wide">
            <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
          </div>

          {/* Powered by */}
          <div className="text-xs text-gray-600 tracking-wide">
            <p>
              powered by <span className="font-semibold text-gray-400">seated</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
