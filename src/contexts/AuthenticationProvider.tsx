import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
// @ts-ignore
import { CLIENT_ID, REDIRECT_URI } from '../config.json';
import { AuthenticationContext as AuthenticationContextType } from "../types/AuthenticationContext";
import { useAPI } from "./ApiProvider";

const initial = {
    user: null,
    login: () => {},
    loginModifyAccess: () => {}
}
const AuthenticationContext = createContext<AuthenticationContextType>(initial);

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
}

interface Props {
    children: any;
}
export const AuthenticationProvider: React.FC<Props> = ({ children }) => {
    const { get } = useAPI();
    const [user, setUser] = useState<AuthenticationContextType['user']>({});

    const getUser = useMemo(() => () => {
        const token = window.localStorage.userAccessToken;
        if(token) {
            get('me', true)
                .then(res => res.json())
                .then(response => {
                    setUser(response);
                })
        } else {
            setUser(null);
        }
    }, []);
    useEffect(() => {
        if(user && Object.keys(user).length === 0) {
            getUser();
        }

        window.onstorage = () => {
            if(!user) {
                getUser();
            }
        }
    }, [user, getUser]);

    const login = useMemo(() => (newWindow?: boolean) => {
        const SCOPES = 'user-read-private user-library-read playlist-read-private user-top-read user-read-recently-played';
        const URL =`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI + (newWindow ? '?close=true' : ''))}`;
        if(newWindow) {
            window.open(URL);
        } else {
            window.location.href = URL;
        }
    }, []);
    const loginModifyAccess = useMemo(() => () => {
        console.log('hey')
        const SCOPES = 'playlist-modify-public playlist-modify-private playlist-read-private';
        window.open(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI + '/modify')}`);
    }, []);

    const value = {
        user,
        login,
        loginModifyAccess
    }
    return(
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    )
}