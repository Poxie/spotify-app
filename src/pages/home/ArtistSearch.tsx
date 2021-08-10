import { useMemo, useState } from "react"
import { Flex } from "../../components/Flex"
import { Input } from "../../components/Input"
import { SearchArtist } from "../../types/SearchArtist";
import { ArtistStats } from "./ArtistStats";
import { SearchResults } from "./SearchResults";

export const ArtistSearch = () => {
    const [value, setvalue] = useState('');
    const [activeArtist, setActiveArtist] = useState<string>('');
    const [isFocusing, setIsFocusing] = useState(false);

    const handleFocus = useMemo(() => () => {
        setIsFocusing(true);
    }, []);
    const handleBlur = useMemo(() => () => {
        setTimeout(() => {
            setIsFocusing(false);
        }, 100);
    }, []);

    return(
        <div className="artist-search">
            <Flex flexDirection={'column'} alignItems={'center'}>
                <h1>
                    Search For Your Favorite Artist
                </h1>
                <div className="search">
                    <Input
                        examples={['The Chainsmokers', 'Coldplay', 'Alan Walker']}
                        rounded={true}
                        onChange={setvalue}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    {value !== '' && (
                        <SearchResults 
                            query={value}
                            onClick={setActiveArtist}
                            visible={isFocusing}
                        />
                    )}
                </div>
                <ArtistStats 
                    id={activeArtist}
                />
            </Flex>
        </div>
    )
}