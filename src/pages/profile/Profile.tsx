import { useProfile } from "../../contexts/ProfileProvider"
import './Profile.scss';
import { ProfileHeader } from "./ProfileHeader";

export const Profile = () => {
    const { user, tracks, artists } = useProfile();

    return(
        <div className="profile">
            <ProfileHeader 
                tracks={tracks}
                artists={artists}
            />
        </div>
    )
}