import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Redirect, useHistory } from 'react-router-dom';
import { PageLoading } from "../components/PageLoading";
import { Artist } from "../types/Artist";
import { ProfileContext as ProfileContextType } from "../types/ProfileContext";
import { Track } from "../types/Track";
import { useAPI } from "./ApiProvider";
import { useAuthentication } from "./AuthenticationProvider";

const initial = {
    user: {},
    artists: [],
    tracks: [],
    recommendations: [],
    showMore: () => {},
    changeTopType: (id: 'artists' | 'tracks', type: string) => {}
}
// @ts-ignore: because user is never actually an empty object
const ProfileContext = createContext<ProfileContextType>(initial);

export const useProfile = () => {
    return useContext(ProfileContext);
}

interface Top {
    tracks: Track[], 
    artists: Artist[]
}
interface Props {
    children: any;
}
export const ProfileProvider: React.FC<Props> = ({ children }) => {
    const { get } = useAPI();
    const { user } = useAuthentication();
    const history = useHistory();
    const [top, setTop] = useState<Top>({tracks: [], artists: []});
    const allArtistsAndTracks: any = useRef({artists: {allTime: [], lastFourWeeks: [], lastSixMonths: []}, tracks: {allTime: [], lastFourWeeks: [], lastSixMonths: []}});
    const [recommendations, setRecommendations] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const unlisten = useRef<any>(null);

    const getTop = useMemo(() => async (type: 'artists' | 'tracks', timeRange: 'long_term' | 'medium_term' | 'short_term') => {
        return await get(`me/top/${type}?time_range=${timeRange}&limit=50`, true).then(res => res.json()).then(response => {
            if(response.error) {
                setError(true);
                return [];
            }
            return response.items;
        });
    }, []);
    const fetchUserData = useMemo(() => () => {
        setIsLoading(true);
        getTop('tracks', 'long_term')
            .then(response => {
                setTop(previous => {return {...previous, ...{tracks: response}}});
                allArtistsAndTracks.current.tracks.allTime = response;
            })
            
            getTop('artists', 'long_term')
            .then(response => {
                setTop(previous => {return {...previous, ...{artists: response}}});
                allArtistsAndTracks.current.artists.allTime = response;
            })
    }, []);
    useEffect(() => {
        if(window.location.pathname === '/profile') {
            fetchUserData();
            return;
        }
        unlisten.current = history.listen((location, action) => {
            if(location.pathname === '/profile') {
                fetchUserData();
                unlisten.current();
                unlisten.current = null;
            }
        })
        return () => {
            if(unlisten.current) {
                unlisten.current();
            }
        };
    }, []);

    const getRecommendations = useMemo(() => async (top: Top) => {
        const { artists, tracks } = top;

        const artistSeeds = artists.slice(0,1).map(artist => artist.id).join(',');
        const trackSeeds = tracks.slice(0,3).map(track => track.id).join(',');
        const genreSeeds = artists.slice(0,1).map(artist => {
            if(artist.genres) {
                return artist.genres[0];
            }
        }).join(',');

        return get(`recommendations?seed_artists=${artistSeeds}&seed_tracks=${trackSeeds}&seed_genres=${genreSeeds}`)
    }, [top]);
    useEffect(() => {
        if(!top.tracks.length || !top.artists.length) return;

        getRecommendations(top)
            .then(res => res?.json())
            .then(response => {
                setRecommendations(response.tracks);
                setIsLoading(false);
            })
    }, [top]);

    const showMore = useMemo(() => async () => {
        console.log('helol');
        if(!top.tracks.length || !top.artists.length) return;

        getRecommendations(top)
            .then(res => res.json())
            .then(response => {
                setRecommendations(previous => [...previous, ...response.tracks]);
            })
    }, [top]);

    const changeTopType = useMemo(() => (id: 'artists' | 'tracks', type: 'allTime' | 'lastSixMonths' | 'lastFourWeeks') => {
        if(!allArtistsAndTracks.current[id][type].length) {
            let typeTerm: any;
            if(type === 'lastSixMonths') {
                typeTerm = 'medium_term';
            } else if(type === 'lastFourWeeks') {
                typeTerm = 'short_term';
            } else if(type === 'allTime') {
                typeTerm = 'long_term';
            }
            getTop(id, typeTerm)
                .then(response => {
                    setTop(previous => {
                        previous = {...previous, ...{[id]: response}}
                        return previous;
                    });
                    allArtistsAndTracks.current[id][type] = response;
                })
        } else {
            setTop(previous => {
                previous = {...previous, ...{[id]: allArtistsAndTracks.current[id][type]}};
                return previous;
            });
        }
    }, []);

    if((!user || error) && isLoading) return <Redirect to="/authorize" />;
    if(!user) return <div></div>

    if((!Object.keys(user).length || !top.tracks?.length || !top.artists?.length || !recommendations.length || error) && isLoading) return <PageLoading />;

    const value = {
        user: user,
        tracks: top.tracks,
        artists: top.artists,
        recommendations: recommendations,
        showMore: showMore,
        changeTopType: changeTopType
    }
    return(
        // @ts-ignore
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}