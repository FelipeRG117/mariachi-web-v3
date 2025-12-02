import React from 'react';
import { Carousel } from 'antd';
import { Bebas_Neue } from 'next/font/google';
import Image from 'next/image';
const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
});


//crear clases de los colores del contenido de style y el contentclass osea su color 
export default function LastReleasesCarousel() {
    return (
        <Carousel autoplay>
            <div className='border-2 border-red-500 bg-white p-4' >
                <LastReleasesCard />
            </div>
           {/* <div>
                <h3 className={contentClassName}>2</h3>
            </div>
            <div>
                <h3 className={contentClassName}>3</h3>
            </div>
            <div>
                <h3 className={contentClassName}>4</h3>
            </div>
            */}
        </Carousel>
    );
}



//'use client'



function LastReleasesCard() {
    return (
        <div className='bg-white inline-flex flex-col px-12 py-12 space-y-8 items-center justify-center shadow-xl hover:scale-105 transition-all duration-300'>
            <span className={`${bebas_neue.className} text-4xl font-bold text-gray-800`}>Volar</span>
            
            {/* Contenedor relativo para la imagen y filtro */}
            <div className="relative">
                <Image
                    src="https://i.scdn.co/image/ab67616d00001e02c83142331e9ff18ed35aa876"
                    alt="Profile"
                    width={192}
                    height={192}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl ring-2 ring-black"
                />
                {/* Filtro solo sobre la imagen */}
                <div className="absolute inset-0 bg-white/30 backdrop-saturate-300 rounded-full z-10"></div>
            </div>
            
            <div className="flex flex-col gap-1 self-center">
          <div className='text-gray-500 text-md'>
            Escuchar en:
            </div>
          <div className="grid grid-cols-4 gap-3">
            <a
              href={'#'}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-green-500 hover:text-green-600 transition-colors text-2xl"
              title="Spotify"
            >
              <SpotifyIcon />
            </a>
            <a
              href={'#'}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-gray-800 hover:text-black transition-colors"
              title="Apple Music"
            >
              <AppleIcon />
            </a>
            <a
              href={'#'}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-blue-500 hover:text-blue-600 transition-colors"
              title="Amazon Music"
            >
              <AmazonIcon />
            </a>
            <a
              href={'#'}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-red-500 hover:text-red-600 transition-colors"
              title="YouTube Music"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>
        </div>
    )
};





//-----------------------

// Componente para iconos SVG simples

const SpotifyIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.859-.179-.98-.599-.122-.421.18-.861.599-.98 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02l.022.14zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.301 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );

  const AppleIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );

  const AmazonIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.045 18.02c.072-.116.187-.18.315-.18.072 0 .151.014.236.043 6.076 2.924 12.933 4.398 19.954 4.398 3.428 0 6.753-.533 9.929-1.591.194-.065.394-.097.598-.097.26 0 .51.08.725.233.194.138.337.332.404.552.067.22.051.455-.046.665-.26.565-.842.974-1.468 1.038-3.244.654-6.606.979-10.023.979-7.706 0-15.115-1.669-21.848-4.898-.276-.132-.446-.4-.446-.695 0-.174.059-.341.17-.477z" />
      <path d="M20.409 14.707c-2.533-1.851-6.644-2.826-9.574-2.826-4.531 0-8.606 1.671-11.33 4.418-.127.127-.188.297-.175.472.013.174.09.338.22.456.362.329.936.297 1.265-.071 2.201-2.465 5.775-3.843 9.527-3.843 2.647 0 6.328.821 8.482 2.396.17.125.377.187.586.175.208-.013.407-.09.557-.22.329-.284.372-.782.087-1.112-.047-.054-.099-.104-.154-.148z" />
    </svg>
  );

  const YouTubeIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
