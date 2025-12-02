// types/concert.ts

// ======================
// 1. Tipos Fundamentales
// ======================

export type CountryCode = 'Mexico' | 'USA' | 'Belgium' | 'Canada' | 'UK' | 'Spain';
export type CityName = 
  | 'Ciudad de México' 
  | 'Guadalajara' 
  | 'Monterrey' 
  | 'Los Angeles' 
  | 'San Francisco' 
  | 'Antwerp'
  | string;

export type VenueName = 
  | 'Foro Sol' 
  | 'Arena VFG' 
  | 'Showcenter Complex' 
  | 'The Greek Theatre' 
  | 'The Fillmore' 
  | 'OLT Riverenhof'
  | string;

export enum MusicPlatform {
  spotify = 'spotify',
  appleMusic = 'appleMusic',
  amazonMusic = 'amazonMusic',
  youtubeMusic = 'youtubeMusic'
}

export type ProductCategory = 'LUIS CARLOS GAGO' | 'MERCH' | 'VINYL' | 'CLOTHING';

// ======================
// 2. Interfaces Principales
// ======================

export interface Concert {
  readonly date: `${string} ${number}, ${number}`; // "MAR 15, 2025"
  readonly venue: VenueName;
  readonly city: CityName;
  readonly country: CountryCode;
  readonly soldOut: boolean;
  readonly ticketUrl: `#` | `https://${string}`;
}

export interface MusicPlatforms {
  readonly [MusicPlatform.spotify]: `https://open.spotify.com/album/${string}`;
  readonly [MusicPlatform.appleMusic]: `https://music.apple.com/album/${string}`;
  readonly [MusicPlatform.amazonMusic]: `https://music.amazon.com/albums/${string}`;
  readonly [MusicPlatform.youtubeMusic]: `https://music.youtube.com/playlist?list=${string}`;
}

export interface Album {
  readonly id: number;
  readonly title: string;
  readonly releaseDate: `${number}-${number}-${number}`; // YYYY-MM-DD
  readonly coverArt: `/${string}.jpg`;
  readonly platforms: MusicPlatforms;
}

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory;
  readonly image: `/${string}.jpg`;
  readonly soldOut?: boolean;
  readonly badge?: 'SOLD OUT' | 'NEW' | 'LIMITED';
}

export interface SpotifyStats {
  readonly followers: number;
  readonly monthlyListeners: number;
}

// ======================
// 3. Tipos de Respuesta
// ======================

export type ConcertResponse = ReadonlyArray<Concert>;
export type VideoGalleryResponse = ReadonlyArray<string>; // YouTube IDs
export type PictureGalleryResponse = ReadonlyArray<`/${string}.jpg`>;
export type AlbumsResponse = ReadonlyArray<Album>;
export type ProductsResponse = ReadonlyArray<Product>;
export type SpotifyDataResponse = SpotifyStats;

// ======================
// 4. Interfaz del Servicio
// ======================

export interface IDataService {
  getConcerts(): Promise<ConcertResponse>;
  getVideosGallery(): Promise<VideoGalleryResponse>;
  getPicturesGallery(): Promise<PictureGalleryResponse>;
  getAlbums(): Promise<AlbumsResponse>;
  getSpotifyData(): Promise<SpotifyDataResponse>;
  getProducts(): Promise<ProductsResponse>;
}

// ======================
// 5. Implementación Tipada
// ======================

export const DataService: IDataService = {
  async getConcerts(): Promise<ConcertResponse> {
    return [
      {
        date: "MAR 15, 2025",
        venue: "Foro Sol",
        city: "Ciudad de México",
        country: "Mexico",
        soldOut: false,
        ticketUrl: "#",
      },
      {
        date: "MAR 16, 2025",
        venue: "Arena VFG",
        city: "Guadalajara",
        country: "Mexico",
        soldOut: true,
        ticketUrl: "#",
      },
      {
        date: "MAR 17, 2025",
        venue: "Showcenter Complex",
        city: "Monterrey",
        country: "Mexico",
        soldOut: false,
        ticketUrl: "#",
      },
      {
        date: "MAR 20, 2025",
        venue: "The Greek Theatre",
        city: "Los Angeles",
        country: "USA",
        soldOut: false,
        ticketUrl: "#",
      },
      {
        date: "MAR 21, 2025",
        venue: "The Fillmore",
        city: "San Francisco",
        country: "USA",
        soldOut: true,
        ticketUrl: "#",
      },
      {
        date: "SEP 7, 2026",
        venue: "OLT Riverenhof",
        city: "Antwerp",
        country: "Belgium",
        soldOut: false,
        ticketUrl: "#",
      },
    ] as const;
  },

  async getVideosGallery(): Promise<VideoGalleryResponse> {
    return [
      "dQw4w9WgXcQ",
      "kJQP7kiw5Fk",
      "9bZkp7q19f0",
      "fJ9rUzIMcZQ",
      "60ItHLz5WEA",
      "hTWKbfoikeg",
      "nfWlot6h_JM",
      "YQHsXMglC9A",
    ] as const;
  },

  async getPicturesGallery(): Promise<PictureGalleryResponse> {
    return [
      "/concert-stage-lights-performer.jpg",
      "/musician-with-guitar-backstage.jpg",
      "/crowd-at-concert-venue.jpg",
      "/artist-performing-on-stage-spotlight.jpg",
      "/recording-studio-musician.jpg",
      "/band-rehearsal-black-and-white.jpg",
      "/concert-poster-vintage-style.jpg",
      "/musician-portrait-dramatic-lighting.jpg",
      "/live-music-performance-energy.jpg",
      "/festival-stage-sunset.jpg",
      "/artist-signing-autographs-fans.jpg",
      "/acoustic-performance-intimate-venue.jpg",
    ] as const;
  },

  async getAlbums(): Promise<AlbumsResponse> {
    return [
      {
        id: 1,
        title: "Primer Álbum",
        releaseDate: "1990-01-15",
        coverArt: "/vinyl-record-album-cover-vintage-1990.jpg",
        platforms: {
          spotify: "https://open.spotify.com/album/example1",
          appleMusic: "https://music.apple.com/album/example1",
          amazonMusic: "https://music.amazon.com/albums/example1",
          youtubeMusic: "https://music.youtube.com/playlist?list=example1",
        },
      },
      {
        id: 2,
        title: "Segundo Álbum",
        releaseDate: "1992-06-20",
        coverArt: "/music-album-cover-portrait-artist-1992.jpg",
        platforms: {
          spotify: "https://open.spotify.com/album/example2",
          appleMusic: "https://music.apple.com/album/example2",
          amazonMusic: "https://music.amazon.com/albums/example2",
          youtubeMusic: "https://music.youtube.com/playlist?list=example2",
        },
      },
      {
        id: 3,
        title: "En Vivo",
        releaseDate: "1995-11-10",
        coverArt: "/live-concert-album-cover-stage-lights.jpg",
        platforms: {
          spotify: "https://open.spotify.com/album/example3",
          appleMusic: "https://music.apple.com/album/example3",
          amazonMusic: "https://music.amazon.com/albums/example3",
          youtubeMusic: "https://music.youtube.com/playlist?list=example3",
        },
      },
      {
        id: 4,
        title: "Grandes Éxitos",
        releaseDate: "1998-03-25",
        coverArt: "/greatest-hits-album-gold-cover-elegant.jpg",
        platforms: {
          spotify: "https://open.spotify.com/album/example4",
          appleMusic: "https://music.apple.com/album/example4",
          amazonMusic: "https://music.amazon.com/albums/example4",
          youtubeMusic: "https://music.youtube.com/playlist?list=example4",
        },
      },
      {
        id: 5,
        title: "Acústico",
        releaseDate: "2001-09-12",
        coverArt: "/acoustic-album-cover-guitar-intimate.jpg",
        platforms: {
          spotify: "https://open.spotify.com/album/example5",
          appleMusic: "https://music.apple.com/album/example5",
          amazonMusic: "https://music.amazon.com/albums/example5",
          youtubeMusic: "https://music.youtube.com/playlist?list=example5",
        },
      },
      {
        id: 6,
        title: "Nuevo Disco",
        releaseDate: "2024-12-01",
        coverArt: "/modern-album-cover-minimalist-elegant-2024.jpg",
        platforms: {
          spotify: "https://open.spotify.com/album/example6",
          appleMusic: "https://music.apple.com/album/example6",
          amazonMusic: "https://music.amazon.com/albums/example6",
          youtubeMusic: "https://music.youtube.com/playlist?list=example6",
        },
      },
    ] as const;
  },

  async getSpotifyData(): Promise<SpotifyDataResponse> {
    return {
      followers: 1250000,
      monthlyListeners: 3500000,
    } as const;
  },

  async getProducts(): Promise<ProductsResponse> {
    return [
      {
        id: 1,
        name: "Another One 10th Anniversary Vinyl",
        price: 43.98,
        category: "LUIS CARLOS GAGO",
        image: "/vinyl-record-album-cover-vintage-1990.jpg",
        soldOut: true,
        badge: "SOLD OUT",
      },
      {
        id: 2,
        name: 'Guitar 12" Yellow LP',
        price: 26.98,
        category: "LUIS CARLOS GAGO",
        image: "/music-album-cover-portrait-artist-1992.jpg",
      },
      {
        id: 3,
        name: 'Guitar 12" Black LP',
        price: 26.98,
        category: "LUIS CARLOS GAGO",
        image: "/live-concert-album-cover-stage-lights.jpg",
      },
      {
        id: 4,
        name: "Guitar White T-Shirt",
        price: 30.0,
        category: "LUIS CARLOS GAGO",
        image: "/concert-stage-lights-performer.jpg",
      },
      {
        id: 5,
        name: "Guitar White Dad Hat",
        price: 30.0,
        category: "LUIS CARLOS GAGO",
        image: "/musician-with-guitar-backstage.jpg",
      },
      {
        id: 6,
        name: "MRL Hockey Jersey",
        price: 200.0,
        category: "LUIS CARLOS GAGO",
        image: "/crowd-at-concert-venue.jpg",
      },
      {
        id: 7,
        name: "Black Hoodie",
        price: 55.0,
        category: "LUIS CARLOS GAGO",
        image: "/artist-performing-on-stage-spotlight.jpg",
      },
      {
        id: 8,
        name: "Blue Hoodie",
        price: 55.0,
        category: "LUIS CARLOS GAGO",
        image: "/recording-studio-musician.jpg",
      },
      {
        id: 9,
        name: "Gray Hoodie",
        price: 55.0,
        category: "LUIS CARLOS GAGO",
        image: "/band-rehearsal-black-and-white.jpg",
      },
    ] as const;
  },
};

export default DataService;