import { Redirect } from 'react-router-dom';
// @ts-ignore
import { CLIENT_SECRET, CLIENT_ID, SPOTIFY_TOKEN_ENDPOINT } from '../../config.json';

export const Authorize = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    if(!code) return <Redirect to="/" />;

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
        if(!response.access_token) return;
        window.localStorage.userAccessToken = response.access_token;
    }).catch(console.error);
    
    window.location.href = window.location.origin;

    return(
        <div className="authorize"></div>
    )
}