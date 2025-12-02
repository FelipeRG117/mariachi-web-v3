import { InstagramConnectCard } from "./components";

import { Bebas_Neue } from "next/font/google";

const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
});

export default function NewsLetterContainer() {
    return (
        <div className="w-full bg-white ">
            <div className="bg-gray-300 px-2 py-4 lg:px-4 lg:pt-8 lg:py-12">
                <div className="flex flex-col gap-4">
                   <div className="flex flex-col items-center text-black">
                        <span className={`${bebas_neue.className} text-4xl font-bold`}>Newsletter</span>
                        <span className="text-xl">Suscríbete para recibir primero que nadie información exclusiva sobre mi.</span>
                   </div>
                   <div className="flex flex-col gap-4 lg:flex-row">
                    <InstagramConnectCard/>
                    <InstagramConnectCard/>
                   </div>
                
                </div>
            </div> 
        </div>
       
    )
}