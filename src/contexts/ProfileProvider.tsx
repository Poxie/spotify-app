import React, { createContext, useContext, useEffect, useState } from "react"
import { Redirect } from 'react-router-dom';
import { Artist } from "../types/Artist";
import { ProfileContext as ProfileContextType } from "../types/ProfileContext";
import { Track } from "../types/Track";
import { useAPI } from "./ApiProvider";
import { useAuthentication } from "./AuthenticationProvider";

const initial = {
    user: {},
    artists: [],
    tracks: []
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
    const [top, setTop] = useState<{tracks: Track[], artists: Artist[]}>({tracks: [], artists: []});

    useEffect(() => {
        get('me/top/tracks?time_range=long_term&limit=50', true)
            .then(res => res.json())
            .then(response => {
                setTop(previous => {return {...previous, ...{tracks: response.items}}});
            })

        get('me/top/artists?time_range=long_term&limit=50', true)
            .then(res => res.json())
            .then(response => {
                setTop(previous => {return {...previous, ...{artists: response.items}}});
            })
    }, []);

    if(!user) return <Redirect to="/authorize" />;

    if(!Object.keys(user).length || !top.tracks.length || !top.artists.length) return <div>loading</div>

    const value = {
        user: user,
        tracks: top.tracks,
        artists: top.artists
    }
    return(
        // @ts-ignore
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}