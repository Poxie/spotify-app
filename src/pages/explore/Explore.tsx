import { useEffect, useMemo, useState } from 'react';
import { SearchArtist } from '../../types/SearchArtist';
import { Track } from '../../types/Track';
import './Explore.scss';
import { ExploreAlternatives } from './ExploreAlternatives';
import { ExploreHeader } from './ExploreHeader';
export const Explore = () => {
    const [seeds, setSeeds] = useState<{track: null | Track, artist: null | SearchArtist}>({track: null, artist: null});
    const [isExploring, setIsExploring] = useState(false);

    const explore = (track: Track, artist: SearchArtist) => {
        document.body.style.overflow = 'hidden';
        setSeeds({track, artist});
        setIsExploring(true);
    }

    useEffect(() => {
        return () => {
            document.body.style.overflow = ''
        };
    }, []);

    return(
        <div className="explore">
            <ExploreHeader 
                onExplore={explore}
                isExploring={isExploring}
            />
            {seeds.artist && seeds.track && (
                <ExploreAlternatives 
                    artist={seeds.artist}
                    track={seeds.track}
                    setIsExploring={setIsExploring}
                    isExploring={isExploring}
                />
            )}
        </div>
    )
}