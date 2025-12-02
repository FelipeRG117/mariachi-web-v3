'use client'
import { List } from 'antd'
import AlbumCard from './AlbumCard'
import { Album } from '@/lib/data/albums'

export default function AlbumsList({ albums }: { albums: Album[] }) {

    const renderAlbumCard = (album: Album) => {
        return <AlbumCard album={album} />
    }

    return (
        <div className="w-full lg:px-32 pt-32 pb-64 flex flex-col gap-4  text-black ">
        <List 
        grid={{ gutter: 24, column: 5, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={albums}
            renderItem={renderAlbumCard}
        />
        </div>
    )
}