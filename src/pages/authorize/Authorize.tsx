import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @ts-ignore
import { CLIENT_SECRET, CLIENT_ID, SPOTIFY_TOKEN_ENDPOINT, REDIRECT_URI } from '../../config.json';
import { useAuthentication } from '../../contexts/AuthenticationProvider';

export const Authorize = () => {
    const { login, loginModifyAccess } = useAuthentication();
    // @ts-ignore
    const { type } = useParams();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if(!code) {
            if(type === 'modify') {
                return loginModifyAccess();
            } else {
                return login();
            }
        }

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("redirect_uri", type === 'modify' ? REDIRECT_URI + '/modify' : REDIRECT_URI);
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
            if(response.error) {
                if(type !== 'modify') {
                    window.location.href = window.location.origin + '/authorize';
                } else {
                    window.location.href = window.location.origin + '/authorize/modify'
                }
            }
            if(!response.access_token) return;
            if(type === 'modify') {
                window.localStorage.userModifyAccessToken = response.access_token;
                window.close();
            } else {
                window.localStorage.userAccessToken = response.access_token;
            }
            window.location.href = window.location.origin + '/profile';
        }).catch(console.error);
    }, []);



    return(
        <div className="authorize"></div>
    )
}