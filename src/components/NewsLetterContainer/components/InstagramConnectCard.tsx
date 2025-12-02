"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function InstagramConnectCard() {

  const instagramLink = "https://www.instagram.com/channel/AbbYSB48qnwzAeoI/"; // Tu link real de Instagram aquí


  // Componente del QR Code con imagen PNG
  const QRCodeImage = () => (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md border-2 border-gray-100">
        <Image
          src="/images/qr-code-losplebes-2.png"
          alt="QR Code para Instagram"
          width={192}
          height={192}
          className="w-40 md:w-48 h-40 md:h-48 object-contain"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full  mx-auto">
      {/* Card principal */}
      <div className="bg-white px-8 py-4 rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col justify-center items-center md:flex-row md:items-center md:gap-12">
          
          {/* Sección de texto */}
          <div className="w-full md:w-2/3 text-center md:text-center md:px-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Suscríbete a Los Plebes!
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-6 max-w-lg mx-auto">
              En este grupo de Instagram compartiré contenido exclusivo y nos mantendremos conectados.
              Únete a nuestra comunidad para recibir las últimas novedades, detrás de cámaras,
              y contenido que no verás en ningún otro lado. Únete escaneando el código QR o haciendo click en el enlace.
              <span className="text-center ml-4">
              <Link
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6  rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                href={instagramLink}
                target="_blank"
              >
                Unirme a Los Plebes!
              </Link>
            </span>
            </p>
          </div>

          {/* Sección del QR */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center space-y-4 md:px-4">
            
            <QRCodeImage />
            
           
          </div>
          
        </div>
      </div>
    </div>
  );
}