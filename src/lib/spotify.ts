// lib/spotify.js
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const ARTIST_ID ='7CSvmLIEPDNTl6hcftk72r' //process.env.ARTIST_ID;

export const getSpotifyToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await response.json();
  return data.access_token;
};

export const getAllArtistTracks = async () => {
  try {
    const token = await getSpotifyToken();
    
    // 1. Obtener TODOS los álbumes/singles del artista
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single,compilation&market=US&limit=50&offset=0`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    const albumsData = await albumsResponse.json();
    let allAlbums = albumsData.items;
    
    // Si hay más de 50 álbumes, hacer requests adicionales
    let offset = 50;
    while (albumsData.total > offset) {
      const moreAlbumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single,compilation&market=US&limit=50&offset=${offset}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const moreAlbumsData = await moreAlbumsResponse.json();
      allAlbums = [...allAlbums, ...moreAlbumsData.items];
      offset += 50;
    }

    // 2. Para cada álbum, obtener sus canciones
    interface SpotifyTrack {
      id: string
      name: string
      track_number: number
      disc_number: number
      duration_ms: number
      duration_formatted: string
      preview_url: string | null
      spotify_url: string
      album: {
        id: string
        name: string
        type: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        images: Array<{ url: string; height: number; width: number }>
        spotify_url: string
      }
      artists: Array<{
        id: string
        name: string
        spotify_url: string
      }>
    }

    let allTracks: SpotifyTrack[] = [];
    
    for (const album of allAlbums) {
      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      const tracksData = await tracksResponse.json();

      // 3. Formatear cada canción con toda la info
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedTracks = tracksData.items.map((track: any) => ({
        // Info básica
        id: track.id,
        name: track.name,
        track_number: track.track_number,
        disc_number: track.disc_number,
        
        // Duración
        duration_ms: track.duration_ms,
        duration_formatted: formatDuration(track.duration_ms),
        
        // Preview
        preview_url: track.preview_url,
        
        // Enlaces
        spotify_url: track.external_urls?.spotify,
        
        // Info del álbum
        album: {
          id: album.id,
          name: album.name,
          type: album.album_type, // album, single, compilation
          release_date: album.release_date,
          release_date_precision: album.release_date_precision,
          total_tracks: album.total_tracks,
          images: album.images, // Array con diferentes tamaños
          spotify_url: album.external_urls?.spotify
        },
        
        // Artistas (por si hay colaboraciones)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        artists: track.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
          spotify_url: artist.external_urls?.spotify
        }))
      }));
      
      allTracks = [...allTracks, ...formattedTracks];
    }

    // 4. Eliminar duplicados (mismo track en diferentes álbumes)
    const uniqueTracks = allTracks.filter((track, index, self) => 
      index === self.findIndex(t => t.name === track.name && t.duration_ms === track.duration_ms)
    );

    // 5. Ordenar por fecha de lanzamiento (más recientes primero)
    const sortedTracks = uniqueTracks.sort((a, b) =>
      new Date(b.album.release_date).getTime() - new Date(a.album.release_date).getTime()
    );

    return sortedTracks;
    
  } catch (error) {
    console.error('Error fetching artist tracks:', error);
    return [];
  }
};

// Helper para formatear duración
const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};