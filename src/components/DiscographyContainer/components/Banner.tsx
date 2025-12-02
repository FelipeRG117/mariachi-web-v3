// components/BiographyBanner.jsx
"use client"

import { Button, Space, Typography } from 'antd'
import { PlayCircleOutlined, DownOutlined } from '@ant-design/icons'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
})

const { Title, Paragraph } = Typography

export default function Banner({
  title = "BIOGRAFÍA",
  backgroundImage = "https://github.com/gui24xr/Desarrollo-Web-Coderhouse-Entrega-Final-GuillermoGuardia/blob/main/imagenes/galeria/8.jpg",
  className = ""
}) {

  const scrollToContent = () => {
    const nextSection = document.querySelector('#biografia-content')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      {/* Navbar */}


      {/* Banner Container */}
      <div
        className={`
        relative w-full flex items-center justify-center
        bg-cover bg-center bg-fixed
        ${className}
      `}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
        }}
      >
        {/* Content Container */}
        <div className="text-center text-white z-10 max-w-4xl mx-auto px-4 animate-fade-in-up">

          {/* Title */}
          <Title
            level={1}
            className={`!text-white !mb-4 !text-5xl md:!text-7xl font-bold tracking-wider ${merriweather.className}`}
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              margin: 0
            }}
          >
            {title}
          </Title>

          {/* Subtitle */}
          <Title
            level={3}
            className="!text-white/90 !mb-6 !text-xl md:!text-2xl font-light"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              margin: 0
            }}
          >

          </Title>

          {/* Description */}
          <Paragraph
            className="!text-white/80 !text-lg md:!text-xl !leading-relaxed max-w-2xl mx-auto mb-8"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              margin: '0 auto 2rem'
            }}
          >

          </Paragraph>

          {/* Action Buttons */}
          <Space size="large" className="mb-12">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              className="bg-white/90 text-black border-none font-semibold hover:bg-white hover:scale-105 transition-all duration-300"
              onClick={() => console.log('Play intro video')}
            >

            </Button>

            <Button
              type="default"
              size="large"
              className="bg-transparent text-white border-white/60 font-semibold hover:bg-white/10 hover:border-white transition-all duration-300"
              onClick={scrollToContent}
            >

            </Button>
          </Space>

          {/* Scroll Indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
            onClick={scrollToContent}
          >
            <DownOutlined className="text-white/70 text-2xl hover:text-white transition-colors" />
          </div>
        </div>

        {/* Overlay Pattern (opcional) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>
    </div>
  )
}

// CSS adicional para la animación (agregar a globals.css)
/*
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}
*/