import React from 'react';
import Image from 'next/image';

const TextAroundCircle = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      
      {/* Opción 1: Básico con shape-outside */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Opción 1: Shape-outside básico</h3>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover float-left mr-4 mb-4"
            style={{ shapeOutside: 'circle(50%)' }}
          />
          <p className="text-gray-700 leading-relaxed">
            Este texto se curvará alrededor del círculo de la imagen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Opción 2: Con más margen */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Opción 2: Con shape-margin para más espacio</h3>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
            alt="Profile"
            width={160}
            height={160}
            className="w-40 h-40 rounded-full object-cover float-left mr-6 mb-4"
            style={{
              shapeOutside: 'circle(50%)',
              shapeMargin: '1.5rem'
            }}
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            Este texto tendrá más margen alrededor del círculo gracias a shape-margin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
      </div>

      {/* Opción 3: Con Tailwind arbitrary values */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Opción 3: Con clases arbitrarias de Tailwind</h3>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
            alt="Profile"
            width={144}
            height={144}
            className="w-36 h-36 rounded-full object-cover float-left mr-5 mb-3 [shape-outside:circle(50%)] [shape-margin:1.2rem]"
          />
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Primer párrafo:</strong> Este enfoque usa clases arbitrarias de Tailwind para mantener todo en el className. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Segundo párrafo:</strong> El texto continúa fluyendo naturalmente alrededor de la imagen. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      {/* Opción 4: Imagen más grande */}
      <div className="bg-green-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Opción 4: Imagen más grande con texto justificado</h3>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
            alt="Profile"
            width={192}
            height={192}
            className="w-48 h-48 rounded-full object-cover float-left mr-6 mb-4 shadow-lg"
            style={{
              shapeOutside: 'circle(50%)',
              shapeMargin: '2rem'
            }}
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            Con una imagen más grande, el efecto se vuelve más dramático y visualmente interesante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </p>
        </div>
      </div>

      {/* Opción 5: Con borde decorativo */}
      <div className="bg-purple-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Opción 5: Con borde decorativo</h3>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face"
            alt="Profile"
            width={160}
            height={160}
            className="w-40 h-40 rounded-full object-cover float-left mr-5 mb-4 border-4 border-white shadow-xl"
            style={{
              shapeOutside: 'circle(50%)',
              shapeMargin: '1.5rem'
            }}
          />
          <p className="text-gray-700 leading-relaxed">
            Esta versión incluye un borde blanco y sombra para hacer la imagen más prominente. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

    </div>
  );
};

export default TextAroundCircle;