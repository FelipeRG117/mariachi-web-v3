import React from 'react';
import Image from 'next/image';
import NavBar from '../../NavBar/NavBar';

const DiscografiaBanner = () => {
  return (
    <div className="bg-black">
      {/* Container principal */}
      <div className="relative w-full h-48 md:h-80 xl:min-h-[50vh] overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=1080&fit=crop"
          alt="Fondo discografía"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
        
        {/* NavBar */}
        <div className="absolute top-0 left-0 w-full z-20">
          <NavBar />
        </div>
        
        {/* Título */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold tracking-wider uppercase">
            DISCOGRAFÍA
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DiscografiaBanner;