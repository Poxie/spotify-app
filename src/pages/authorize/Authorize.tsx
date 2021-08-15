import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @ts-ignore
import { CLIENT_SECRET, CLIENT_ID, SPOTIFY_TOKEN_ENDPOINT, REDIRECT_URI } from '../../config.json';
import { useAuthentication } from '../../contexts/AuthenticationProvider';

export const Authorize = () => {
    const { login, loginModifyAccess } = useAuthentication();
    // @ts-ignore
    const { type } = useParams();
    const close = new URLSearchParams(window.location.search).get('close');
    console.log(close);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if(!code) {
            if(type === 'modify') {
                return loginModifyAccess(false);
            } else {
                return login();
            }
        }

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        let NEW_REDIRECT_URI = REDIRECT_URI;
        if(close) {
            NEW_REDIRECT_URI += '?close=true';
        }
        data.append("redirect_uri", type === 'modify' ? NEW_REDIRECT_URI + '/modify' : NEW_REDIRECT_URI);
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
                    const url = window.location.origin + '/authorize' + close ? '?close=true' : '';
                    window.location.href = url;
                } else {
                    const url = window.location.origin + '/authorize/modify' + close ? '?close=true' : '';
                    window.location.href = url;
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
            if(close) {
                window.close();
            }
        }).catch(console.error);
    }, []);



    return(
        <div className="authorize"></div>
    )
}