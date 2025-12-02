"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function VideoGalleryContainer({
  videosList,
}: {
  videosList: string[]
}) {
  const [videos, setVideos] = useState<string[]>([])
  const [currentVideo, setCurrentVideo] = useState<string>(videosList[0] || "")

  useEffect(() => {
    setVideos(videosList)
    setCurrentVideo(videosList[0] || "")
  }, [videosList])

  if (videos.length === 0) return <p className="text-white text-center">No hay videos</p>

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <YouTubeChannelLink />
      </div>

      <div className="w-full">
        <VideoCard videoId={currentVideo} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((item, index) => (
          <div key={index} onClick={() => setCurrentVideo(item)} className="cursor-pointer group">
            <VideoThumbnail videoId={item} isActive={item === currentVideo} />
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoCard({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

function VideoThumbnail({
  videoId,
  isActive,
}: {
  videoId: string
  isActive: boolean
}) {
  return (
    <div
      className={`relative w-full aspect-video rounded-sm overflow-hidden transition-all duration-300 ${
        isActive ? "ring-2 ring-[#d4a574] scale-105" : "ring-1 ring-gray-800 hover:ring-[#d4a574] hover:scale-105"
      }`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt="Video thumbnail"
        width={320}
        height={180}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
        <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-5 h-5 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function YouTubeChannelLink() {
  return (
    <a
      href="https://www.youtube.com/channel/UCmM_ZyfM66rCweB_w65quag?sub_confirmation=1"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-[#d4a574] hover:bg-[#c09563] text-black font-light tracking-widest py-3 px-8 uppercase transition-all duration-300 text-sm"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
      Suscríbete a mi canal
    </a>
  )
}
