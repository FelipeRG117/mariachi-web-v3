export interface Concert {
  id: number
  date: string
  dayOfWeek: string
  time: string
  venue: string
  address: string
  city: string
  state?: string
  country: string
  countryFlag?: string
  hasTickets?: boolean
  hasRSVP?: boolean
  soldOut?: boolean
  ticketUrl?: string
}

const concerts: Concert[] = [
  {
    id: 1,
    date: "2024-08-17",
    dayOfWeek: "Sab",
    time: "21:30",
    venue: "Coliseum da Coruña",
    address: "Avenida de Arteixo, 171, 15008 A Coruña",
    city: "A Coruña",
    country: "Spain",
    countryFlag: "🇪🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 2,
    date: "2024-08-20",
    dayOfWeek: "Mie",
    time: "22:00",
    venue: "Starlite Occident",
    address: "Cantera de Nagüeles, s/n, 29602 Marbella",
    city: "Marbella",
    country: "Spain",
    countryFlag: "🇪🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 3,
    date: "2024-08-22",
    dayOfWeek: "Vie",
    time: "21:00",
    venue: "Playa Virgen del Mar",
    address: "Paseo Marítimo de Santander, 39004 Santander",
    city: "Santander",
    country: "Spain",
    countryFlag: "🇪🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 4,
    date: "2024-08-23",
    dayOfWeek: "Sab",
    time: "21:00",
    venue: "Navarra Arena",
    address: "Avenida de Zaragoza, 21, 31005 Pamplona",
    city: "Pamplona",
    country: "Spain",
    countryFlag: "🇪🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 5,
    date: "2024-08-25",
    dayOfWeek: "Lun",
    time: "22:00",
    venue: "Playa del Reducto",
    address: "Avenida Fred Olsen, s/n, 35500 Arrecife",
    city: "Arrecife",
    country: "Spain",
    countryFlag: "🇪🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 6,
    date: "2024-09-06",
    dayOfWeek: "Sab",
    time: "20:00",
    venue: "Dickies Arena",
    address: "1911 Montgomery St, Fort Worth, TX 76107",
    city: "Fort Worth",
    state: "TX",
    country: "United States",
    countryFlag: "🇺🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 7,
    date: "2024-09-07",
    dayOfWeek: "Dom",
    time: "20:00",
    venue: "Don Haskins Center",
    address: "157 Hawthorne St, El Paso, TX 79968",
    city: "El Paso",
    state: "TX",
    country: "United States",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 8,
    date: "2024-09-12",
    dayOfWeek: "Vie",
    time: "20:00",
    venue: "Arizona Financial Theatre",
    address: "400 W Washington St, Phoenix, AZ 85003",
    city: "Phoenix",
    state: "AZ",
    country: "United States",
    countryFlag: "🇺🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 9,
    date: "2024-09-13",
    dayOfWeek: "Sab",
    time: "20:00",
    venue: "MGM Grand Garden Arena",
    address: "3799 S Las Vegas Blvd, Las Vegas, NV 89109",
    city: "Las Vegas",
    state: "NV",
    country: "United States",
    countryFlag: "🇺🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 10,
    date: "2024-09-15",
    dayOfWeek: "Lun",
    time: "20:00",
    venue: "MGM Grand Garden Arena",
    address: "3799 S Las Vegas Blvd, Las Vegas, NV 89109",
    city: "Las Vegas",
    state: "NV",
    country: "United States",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 11,
    date: "2024-09-19",
    dayOfWeek: "Vie",
    time: "20:00",
    venue: "Golden 1 Center",
    address: "500 David J Stern Walk, Sacramento, CA 95814",
    city: "Sacramento",
    state: "CA",
    country: "United States",
    countryFlag: "🇺🇸",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 12,
    date: "2024-09-20",
    dayOfWeek: "Sab",
    time: "20:00",
    venue: "Kia Forum",
    address: "3900 W Manchester Blvd, Inglewood, CA 90305",
    city: "Inglewood",
    state: "CA",
    country: "United States",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 13,
    date: "2024-09-21",
    dayOfWeek: "Dom",
    time: "20:00",
    venue: "Viejas Arena",
    address: "5500 Canyon Crest Dr, San Diego, CA 92182",
    city: "San Diego",
    state: "CA",
    country: "United States",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 14,
    date: "2024-10-04",
    dayOfWeek: "Sab",
    time: "21:00",
    venue: "Estadio GNP Seguros",
    address: "Calzada de Tlalpan 3465, Santa Úrsula Coapa, Ciudad de México",
    city: "Mexico",
    country: "Mexico",
    countryFlag: "🇲🇽",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 15,
    date: "2024-10-23",
    dayOfWeek: "Jue",
    time: "20:00",
    venue: "Arena Cañaveralejo",
    address: "Avenida 2N #46N-74, Cali, Valle del Cauca",
    city: "Cali",
    country: "Colombia",
    countryFlag: "🇨🇴",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 16,
    date: "2024-10-25",
    dayOfWeek: "Sab",
    time: "20:00",
    venue: "Plaza de Toros La Macarena",
    address: "Carrera 63 #48-32, Medellín, Antioquia",
    city: "Medellín",
    country: "Colombia",
    countryFlag: "🇨🇴",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 17,
    date: "2024-10-30",
    dayOfWeek: "Jue",
    time: "20:00",
    venue: "Bullring",
    address: "Calle 35 #27-50, Bucaramanga, Santander",
    city: "Bucaramanga",
    country: "Colombia",
    countryFlag: "🇨🇴",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 18,
    date: "2024-11-01",
    dayOfWeek: "Sab",
    time: "20:00",
    venue: "Movistar Arena",
    address: "Carrera 13 #61-83, Bogotá, Cundinamarca",
    city: "Bogotá",
    country: "Colombia",
    countryFlag: "🇨🇴",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 19,
    date: "2024-11-02",
    dayOfWeek: "Dom",
    time: "20:30",
    venue: "Movistar Arena",
    address: "Carrera 13 #61-83, Bogotá, Cundinamarca",
    city: "Bogotá",
    country: "Colombia",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 20,
    date: "2024-11-06",
    dayOfWeek: "Jue",
    time: "21:00",
    venue: "Coliseo General Rumiñahui",
    address: "Avenida General Rumiñahui, Quito, Pichincha",
    city: "Quito",
    country: "Ecuador",
    countryFlag: "🇪🇨",
    hasTickets: true,
    hasRSVP: true
  },
  {
    id: 21,
    date: "2024-11-08",
    dayOfWeek: "Sab",
    time: "21:00",
    venue: "Estadio Modelo \"Alberto Spencer Herrera\"",
    address: "Avenida Barcelona y Calle Décima, Guayaquil, Guayas",
    city: "Guayaquil",
    country: "Ecuador",
    countryFlag: "🇪🇨",
    hasTickets: true,
    hasRSVP: true
  }
];

export default concerts;