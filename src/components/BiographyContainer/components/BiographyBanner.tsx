import Image from "next/image"

export default function BiographyBanner() {
  // Datos de biografía organizados por año
  const biographyData = [
    {
      year: "1982",
      text: "Con tan solo doce años graba su primer disco. Este será el comienzo de una trayectoria artística excepcional.",
      image: "/images/3.jpg",
      imagePosition: "left" as const,
    },
    {
      year: "1985",
      text: "A los quince años gana su primer Grammy americano y se consagra como el primer cantante hispano más joven en recibir dicho reconocimiento.",
      image: null,
      imagePosition: null,
    },
    {
      year: "1987",
      text: 'Es el debut con la disquera Warner Music lanzando su quinto álbum "Soy Como Quiero Ser" de la mano del productor y compositor Juan Carlos Calderón, con el cual, comenzará una estrecha amistad.',
      image: null,
      imagePosition: null,
    },
    {
      year: "1990",
      text: 'Con el disco "20 Años" vende en tan solo una semana más de 600,000 copias. Seis sencillos del álbum entran simultáneamente en el TOP 100 de México. Realiza una gira por USA y América Latina con un éxito sin precedentes.',
      image: null,
      imagePosition: null,
    },
    {
      year: "1991",
      text: 'Es co-productor de su octavo álbum "Romance" alcanzando ventas de más de siete millones de copias internacionalmente. Se convierte en el primer artista latino en recibir un Disco de Oro en Estados Unidos.',
      image: "/images/12.jpg",
      imagePosition: "right" as const,
    },
  ]

  return (
    <div className="w-full bg-[#2a2a2a] min-h-screen">
      {/* Header */}
        <div className="w-full bg-black py-16 md:py-24 text-center border-b border-[#d4a574]/20">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] uppercase">
          Biografía
        </h1>
      </div>
      {/* Timeline de biografía */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {biographyData.map((item) => (
          <div
            key={item.year}
            className={`flex flex-col ${
              item.imagePosition === "left"
                ? "lg:flex-row"
                : item.imagePosition === "right"
                  ? "lg:flex-row-reverse"
                  : "lg:flex-row"
            } gap-8 lg:gap-12 mb-20 items-start`}
          >
            {/* Imagen (si existe) */}
            {item.image && (
              <div className="w-full lg:w-1/3 relative h-80 lg:h-96 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`Biografía ${item.year}`}
                  fill
                  className="object-cover transition-all hover:grayscale duration-500"
                  quality={90}
                />
              </div>
            )}

            {/* Contenido de texto */}
            <div className={`flex-1 ${!item.image ? "lg:pl-20" : ""}`}>
              <div className="flex items-start gap-6">
                {/* Año */}
                <div className="text-[#d4a574] text-5xl md:text-6xl font-serif font-light tracking-wider flex-shrink-0">
                  {item.year}
                </div>

                {/* Texto */}
                <div className="flex-1 pt-2">
                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">{item.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección final con gradiente */}
      <div className="w-full bg-gradient-to-b from-[#2a2a2a] to-black py-20"></div>
    </div>
  )
}
