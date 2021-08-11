import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// @ts-ignore
import { CLIENT_SECRET, CLIENT_ID, SPOTIFY_TOKEN_ENDPOINT } from '../../config.json';
import { useAuthentication } from '../../contexts/AuthenticationProvider';

export const Authorize = () => {
    const { login } = useAuthentication()

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if(!code) return login();

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("redirect_uri", 'http://localhost:3000/authorize');
        data.append("code", code);

        const encodedClientCredentials = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
        fetch(`${SPOTIFY_TOKEN_ENDPOINT}?grant_type=authorization_code`, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Basic ${encodedClientCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json()).then(response => {
            if(response.error) window.location.href = window.location.origin + '/authorize';
            if(!response.access_token) return;
            window.localStorage.userAccessToken = response.access_token;
            window.location.href = window.location.origin + '/profile';
        }).catch(console.error);
    }, []);

    return(
        <div className="authorize"></div>
    )
}