'use client'

import { useEffect, useState } from 'react'
import { AnnouncementModal, Announcement } from './AnnouncementModal'

interface AnnouncementModalWrapperProps {
  announcement: Announcement | null
}

export function AnnouncementModalWrapper({ announcement }: AnnouncementModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Solo mostrar el anuncio una vez por sesión
    const sessionKey = `announcement-shown-${announcement?.id}`
    const hasShownInSession = sessionStorage.getItem(sessionKey)

    if (announcement && !hasShownInSession && !hasShown) {
      // Pequeño delay antes de mostrar el anuncio para mejor UX
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [announcement, hasShown])

  const handleClose = () => {
    if (announcement) {
      // Marcar como visto en la sesión
      sessionStorage.setItem(`announcement-shown-${announcement.id}`, 'true')
    }
    setIsOpen(false)
  }

  if (!isOpen || !announcement) {
    return null
  }

  return <AnnouncementModal announcement={announcement} onClose={handleClose} />
}
