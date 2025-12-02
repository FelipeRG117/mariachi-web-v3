import { NewsLetterContainer, VideoBanner, NextConcertsComponentContainer} from "../";

export default function HomeContainer() {
    return (
        <div>
            <div className="w-full">
            <VideoBanner/>
        </div>
       
        <div className="w-full">
            <NextConcertsComponentContainer/>
        </div>
        <div className="w-full">
            <NewsLetterContainer/>
        </div>
       
    </div>
    )
}