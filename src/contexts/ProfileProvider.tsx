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
    recommendations: []
}
// @ts-ignore: because user is never actually an empty object
const ProfileContext = createContext<ProfileContextType>(initial);

export const useProfile = () => {
    return useContext(ProfileContext);
}

interface Props {
    children: any;
}
export const ProfileProvider: React.FC<Props> = ({ children }) => {
    const { get } = useAPI();
    const { user } = useAuthentication();
    const history = useHistory();
    const [top, setTop] = useState<{tracks: Track[], artists: Artist[]}>({tracks: [], artists: []});
    const [recommendations, setRecommendations] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const unlisten = useRef<any>(null);

    const fetchUserData = useMemo(() => () => {
        setIsLoading(true);
        get('me/top/tracks?time_range=long_term&limit=50', true)
            .then(res => res.json())
            .then(response => {
                if('error' in response) {
                    return setError(true);
                }
                setTop(previous => {return {...previous, ...{tracks: response.items}}});
            })

        get('me/top/artists?time_range=long_term&limit=50', true)
            .then(res => res.json())
            .then(response => {
                if(response.error) {
                    return setError(true);
                }
                setTop(previous => {return {...previous, ...{artists: response.items}}});
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

    useEffect(() => {
        if(!top.artists?.length || !top.tracks?.length) return;
        const { artists, tracks } = top;

        const artistSeeds = artists.slice(0,1).map(artist => artist.id).join(',');
        const trackSeeds = tracks.slice(0,3).map(track => track.id).join(',');
        const genreSeeds = artists.slice(0,1).map(artist => {
            if(artist.genres) {
                return artist.genres[0];
            }
        }).join(',');
        get(`recommendations?seed_artists=${artistSeeds}&seed_tracks=${trackSeeds}&seed_genres=${genreSeeds}`)
            .then(res => res.json())
            .then(response => {
                setRecommendations(response.tracks);
                setIsLoading(false);
            })
    }, [top]);

    if(!user || error) return <Redirect to="/authorize" />;

    if((!Object.keys(user).length || !top.tracks?.length || !top.artists?.length || !recommendations.length || error) && isLoading) return <PageLoading />;

    const value = {
        user: user,
        tracks: top.tracks,
        artists: top.artists,
        recommendations: recommendations
    }
    return(
        // @ts-ignore
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}