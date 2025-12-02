import React from 'react';
import NavBar from '../../../NavBar/NavBar';
import Image from 'next/image';

const WelcomeContainer = () => {
  return (
    <div className="bg-black">
      {/* Container principal - AÑADIR relative aquí */}
      <div className="relative w-full min-h-screen md:h-80 xl:min-h-screen overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src={"/images/10.jpg"}
          alt={"Fondo bienvenido"}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-white/30 backdrop-brightness-150 bg-white/30 backdrop-saturate-200 z-10"></div>
        
        {/* NavBar */}
        <div className="absolute top-0 left-0 w-full z-30">
          <NavBar />
        </div>
        
        {/* Título */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
           </div>
      </div>
    </div>
  );
};

export default WelcomeContainer;

/*
 <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
        </video>
*/