export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive?: boolean;
}

export const navigationData: NavItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    href: '/',
    order: 1
  },
  {
    id: 'biography',
    label: 'Biografía',
    href: '/biografia',
    order: 2
  },
  {
    id: 'discography',
    label: 'Discografía',
    href: '/discografia',
    order: 3
  },
  {
    id: 'videos',
    label: 'Videos',
    href: '/videos',
    order: 4
  },
  {
    id: 'concerts',
    label: 'Conciertos',
    href: '/conciertos',
    order: 5
  },
  {
    id: 'store',
    label: 'Tienda',
    href: '/tienda',
    order: 6
  },
  {
    id: 'contact',
    label: 'Contacto',
    href: '/contacto',
    order: 7
  }
];

// Función que simula llamada a API
export const fetchNavigationData = async (): Promise<NavItem[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  return navigationData;
}; 