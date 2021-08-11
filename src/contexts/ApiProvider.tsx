import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PageLoading } from "../components/PageLoading";
import { CLIENT_ID, CLIENT_SECRET, API_ENDPOINT } from '../config.json';
import { APIContext as APIContextType } from "../types/APIContext";

const initial = {
    get: () => fetch(``),
    post: () => fetch(``)
}
const APIContext = createContext<APIContextType>(initial);

export const useAPI = () => {
    return useContext(APIContext);
}

interface Props {
    children: any;
}
export const APIProvider: React.FC<Props> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<null | string>(null);

    useEffect(() => {
        const encodedClientCredentials = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
        fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedClientCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json()).then(tokenData => {
            setAccessToken(tokenData.access_token);
        })
    }, []);

    const get = useMemo(() => async (query: string, userAccessToken?: boolean) => {
        // Update '' to user accessToken once AuthenticationProvider is a thing
        console.log(window.localStorage.userAccessToken);
        const token = (userAccessToken && window.localStorage.userAccessToken) ? window.localStorage.userAccessToken : accessToken;
        return await fetch(`${API_ENDPOINT}/${query}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }, [accessToken]);

    const post = useMemo(() => async (query: string) => {
        return await fetch(`${API_ENDPOINT}/${query}`, {
            method: 'POST'
        });
    }, []);

    if(!accessToken) return <PageLoading />;

    const value = {
        get,
        post
    }
    return(
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}