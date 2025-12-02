import { Announcement } from '@/components/AnnouncementModal'

export const announcements: Announcement[] = [
  {
    id: 'new-album-2024',
    title: 'Nuevo Álbum Disponible',
    description: 'Escucha nuestro último álbum completo en todas las plataformas digitales. Una nueva era del mariachi.',
    mediaUrl: '/images/1.jpg',
    mediaType: 'image',
    primaryAction: {
      label: 'Escuchar Ahora',
      href: 'https://open.spotify.com/intl-es/track/0XKhrG7rAggZjaAyCmHBXx?si=4dccea73041c4599'
    },
    secondaryAction: {
      label: 'Seguir en Spotify',
      href: 'https://open.spotify.com/intl-es/artist/7CSvmLIEPDNTl6hcftk72r'
    },
    showOnPages: ['discografia']
  },
  {
    id: 'tour-2024',
    title: '¡Próximas Fechas de Tour!',
    description: 'No te pierdas nuestras presentaciones en vivo. Revisa las fechas y ciudades confirmadas.',
    mediaUrl: '/images/2.jpg',
    mediaType: 'image',
    primaryAction: {
      label: 'Comprar Boletos',
      href: '#'
    },
    secondaryAction: {
      label: 'Ver Más Fechas',
      href: '/conciertos'
    },
    showOnPages: ['conciertos']
  },
  {
    id: 'merch-store',
    title: 'Nueva Colección de Merchandising',
    description: 'Descubre nuestra nueva línea de productos oficiales. Edición limitada disponible.',
    mediaUrl: '/images/3.jpg',
    mediaType: 'image',
    primaryAction: {
      label: 'Comprar Ahora',
      href: '/tienda'
    },
    secondaryAction: {
      label: 'Ver Catálogo',
      href: '/tienda'
    },
    showOnPages: ['tienda']
  }
]

// Función para obtener el anuncio de una página específica
export function getAnnouncementForPage(pageName: string): Announcement | null {
  const announcement = announcements.find(
    (ann) => ann.showOnPages?.includes(pageName)
  )
  return announcement || null
}
