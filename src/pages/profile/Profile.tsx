import { useProfile } from "../../contexts/ProfileProvider"
import './Profile.scss';
import { ProfileHeader } from "./ProfileHeader";
import { Recommendations } from "./Recommendations";

export const Profile = () => {
    const { user, tracks, artists, recommendations } = useProfile();

    return(
        <div className="profile">
            <ProfileHeader 
                tracks={tracks}
                artists={artists}
            />
            <Recommendations 
                tracks={recommendations}
            />
        </div>
    )
}