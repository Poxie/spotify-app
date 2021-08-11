import { useMemo, useState } from "react"
import { Flex } from "../../components/Flex"
import { Search } from "../../components/Search";
import { ArtistStats } from "./ArtistStats";

export const ArtistSearch = () => {
    const [activeArtist, setActiveArtist] = useState<string>('');

    return(
        <div className="artist-search">
            <Flex flexDirection={'column'} alignItems={'center'}>
                <h1>
                    Search For Your Favorite Artist
                </h1>
                <Search 
                    onChoice={setActiveArtist}
                />
                <ArtistStats 
                    id={activeArtist}
                />
            </Flex>
        </div>
    )
}