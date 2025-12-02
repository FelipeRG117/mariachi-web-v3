import { HomeContainer } from "@/components";
import DataService from "@/lib/data";

export const metadata = {
  title: "Juan Pérez - Artista Oficial",
  description: "Sitio oficial de Juan Pérez. Últimas canciones, conciertos y noticias.",
  openGraph: {
    title: "Juan Pérez - Artista Oficial",
    description: "Sitio oficial de Juan Pérez. Últimas canciones, conciertos y noticias.",
    image: "/images/hero-image.jpg",
    url: "https://juanperez.com",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Home() {
  const sanityData = await DataService.getSanityData();

  console.log('sanityData', sanityData);

  return (
    <div className="bg-white">
            <HomeContainer/>
        </div>
  );
}
