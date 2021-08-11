import React, { createContext, useContext } from "react"
import { Redirect } from 'react-router-dom';
import { ProfileContext as ProfileContextType } from "../types/ProfileContext";
import { useAuthentication } from "./AuthenticationProvider";

const initial = {
    user: {},
}
const ProfileContext = createContext<ProfileContextType>(initial);

export const useProfile = () => {
    return useContext(ProfileContext);
}

interface Props {
    children: any;
}
export const ProfileProvider: React.FC<Props> = ({ children }) => {
    const { user } = useAuthentication();
    if(!user) return <Redirect to="/authorize" />;

    const value = {
        user: user
    }
    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}