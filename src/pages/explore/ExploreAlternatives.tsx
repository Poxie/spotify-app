import React, { useEffect, useRef, useState } from "react"
import { CardContainer } from "../../components/CardContainer"
import { Clickable } from "../../components/Clickable";
import { Flex } from "../../components/Flex";
import { PageLoading } from "../../components/PageLoading"
import { useAPI } from "../../contexts/ApiProvider"
import { SearchArtist } from "../../types/SearchArtist"
import { Track } from "../../types/Track"

interface Props {
    track: Track;
    artist: SearchArtist;
    setIsExploring: (state: boolean) => void;
    isExploring: boolean;
}
export const ExploreAlternatives: React.FC<Props> = ({ track, artist, setIsExploring, isExploring }) => {
    const { get } = useAPI();
    const [previous, setPrevious] = useState<{track: null | Track, artist: null | SearchArtist}>({track: null, artist: null});
    const [loaded, setLoaded] = useState<false | Track[]>(false);
    const [hasLoadPage, setHasLoadPage] = useState(true);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If query hasn't changed, don't run fetch requests again
        if(artist.id === previous.artist?.id && track.id === previous.track?.id) {
            if(isExploring) {
                document.body.style.overflow = '';
            }
            return;
        } else {
            setHasLoadPage(true);
            setLoaded(false);
        }

        const artistSeeds = artist.id;
        const trackSeeds = track.id;
        const requests = artist.genres.map(genre => {
            return get(`recommendations?seed_artists=${artistSeeds}&seed_tracks=${trackSeeds}&seed_genres=${genre}`).then(res => res.json()).then(response => {
                return response.tracks;
            });
        })

        Promise.all(requests)
            .then(response => {
                const allTracks: Track[] = [].concat.apply([], response);
                const ids: string[] = [];

                // Removing duplicates
                const tracks = allTracks.filter(track => {
                    if(!ids.includes(track.id)) {
                        ids.push(track.id);
                        return track;
                    }
                });
                setTimeout(() => {
                    setLoaded(tracks);
                    setPrevious({track, artist});
                    document.body.style.overflow = '';

                    setTimeout(() => {
                        setHasLoadPage(false);
                    }, 1000);
                }, 2500);
            })
    }, [isExploring, artist, track]);

    const back = () => {
        if(!ref.current) return;
        document.body.style.overflow = 'hidden';
        ref.current.classList.remove('loaded');
        setIsExploring(false);
    }

    return(
        <div className={`explore-alternatives${loaded ? ' loaded' : ''}`} ref={ref}>
            {hasLoadPage && (
                <PageLoading 
                    message={<span style={{textAlign: 'center', display: 'block'}}>Searching for music related to<br /> <span style={{fontWeight: 'bold'}}>{artist.name}</span> and <span style={{fontWeight: 'bold'}}>{track.name}</span></span>}
                />
            )}
            {loaded && (
                <div className="results">
                    <Clickable onClick={back}>
                        <Flex className="back" alignItems={'center'}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px'}} viewBox="0 0 129 129" width="18" height="18"><path d="M121.4 61.6l-54-54c-.7-.7-1.8-1.2-2.9-1.2s-2.2.5-2.9 1.2l-54 54c-1.6 1.6-1.6 4.2 0 5.8.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2l47-47v98.1c0 2.3 1.8 4.1 4.1 4.1s4.1-1.8 4.1-4.1V20.4l47 47c1.6 1.6 4.2 1.6 5.8 0s1.5-4.2 0-5.8z" fill="var(--text-muted)"/></svg>
                            Go back
                        </Flex>
                    </Clickable>
                    <h1>
                        Tracks related to <span style={{fontWeight: 'bold'}}>{artist.name}</span> and <span style={{fontWeight: 'bold'}}>{track.name}</span>
                    </h1>
                    <CardContainer 
                        showAll={true}
                        tracks={loaded}
                    />
                </div>
            )}
        </div>
    )
}