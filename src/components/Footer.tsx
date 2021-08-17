import './Footer.scss';
import logo from '../assets/spotify-logo.png';
import { Flex } from './Flex';

export const Footer = () => {
    return(
        <div className="footer">
            <Flex className="footer-content" justifyContent={'space-between'} alignItems={'center'}>
                <img src={logo} alt="" />
                <div>
                    All information on this page is fetched from <a href="https://spotify.com" target="_blank">Spotify</a>.
                </div>
            </Flex>
        </div>
    )
}