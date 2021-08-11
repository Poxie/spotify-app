import React from "react"
import { ProfileIcon } from "../../icons/ProfileIcon"

interface Props {
    icon: string | undefined;
}
export const ProfileAvatar: React.FC<Props> = ({ icon }) => {
    return(
        <div className="profile-icon">
            {icon ? (
                <img src={icon} alt="" />
            ) : (
                <ProfileIcon />
            )}
        </div>
    )
}