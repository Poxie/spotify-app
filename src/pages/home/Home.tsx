import { TopTracks } from './TopTracks';
import './Home.scss';
import { ArtistSearch } from './ArtistSearch';

export const Home = () => {
    return (
        <div className="home">
            <TopTracks />
            <ArtistSearch />
        </div>
    )
}
