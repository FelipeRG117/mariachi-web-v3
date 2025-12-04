import { HomeContainer } from "@/components";

export const metadata = {
  title: "Luis Carlos Gago - Artista Oficial",
  description: "Sitio oficial de Luis Carlos Gago. Últimas canciones, conciertos y noticias.",
  openGraph: {
    title: "Luis Carlos Gago - Artista Oficial",
    description: "Sitio oficial de Luis Carlos Gago. Últimas canciones, conciertos y noticias.",
    image: "/images/hero-image.jpg",
    url: "https://luiscarlosgago.com",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Home() {
  // Sanity data integration can be added here when needed
  // const sanityData = await SanityService.getData();

  return (
    <div className="bg-white">
      <HomeContainer />
    </div>
  );
}
