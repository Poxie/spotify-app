import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
// @ts-ignore
import { CLIENT_ID, REDIRECT_URI } from '../config.json';
import { AuthenticationContext as AuthenticationContextType } from "../types/AuthenticationContext";
import { useAPI } from "./ApiProvider";
const SCOPES = 'user-read-private user-library-read playlist-read-private user-top-read user-read-recently-played';

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

    useEffect(() => {
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

    const login = useMemo(() => () => {
        window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    }, []);
    const loginModifyAccess = useMemo(() => () => {
        window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI + '/modify')}`;
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