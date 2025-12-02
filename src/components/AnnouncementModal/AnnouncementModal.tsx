'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export interface Announcement {
  id: string
  title: string
  description: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
  showOnPages?: string[]
}

interface AnnouncementModalProps {
  announcement: Announcement
  onClose: () => void
}

export function AnnouncementModal({ announcement, onClose }: AnnouncementModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Pequeño delay para la animación de entrada
    const timer = setTimeout(() => setIsVisible(true), 100)

    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300) // Esperar a que termine la animación
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      {/* Overlay oscuro con gradiente */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Contenedor del modal */}
      <div
        className={`relative w-full max-w-4xl mx-4 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 hover:scale-110"
          aria-label="Cerrar anuncio"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenido del modal */}
        <div className="flex flex-col md:flex-row">
          {/* Media (imagen o video) */}
          <div className="w-full md:w-2/3 bg-black flex items-center justify-center">
            {announcement.mediaType === 'image' ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={announcement.mediaUrl}
                  alt={announcement.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <video
                src={announcement.mediaUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </div>

          {/* Acciones y descripción */}
          <div className="w-full md:w-1/3 p-8 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {announcement.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {announcement.description}
              </p>
            </div>

            <div className="space-y-3">
              {/* Acción primaria */}
              <a
                href={announcement.primaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-white text-black text-center font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-105 transform"
              >
                {announcement.primaryAction.label}
              </a>

              {/* Acción secundaria */}
              <a
                href={announcement.secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 border-2 border-white text-white text-center font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 transform"
              >
                {announcement.secondaryAction.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
