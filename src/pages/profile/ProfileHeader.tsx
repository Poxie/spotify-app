import React, { useState } from "react"
import { Artist } from "../../types/Artist"
import { Track } from "../../types/Track"
import { MostLikedTracks } from "./MostLikedTracks"
import { ProfileHeaderSection } from "./ProfileHeaderSection"

interface Props {
    tracks: Track[];
    artists: Artist[];
}
export const ProfileHeader: React.FC<Props> = ({ tracks, artists }) => {
    const [allTracks, setAllTracks] = useState(false);
    const [allArtists, setAllArtists] = useState(false);
    return(
        <div className="profile-header">
            <ProfileHeaderSection 
                header={'Your Most Liked Songs'} 
                onExpand={() => setAllTracks(!allTracks)}
                isExpanded={allTracks}
            >
                <MostLikedTracks 
                    tracks={tracks}
                    showAll={allTracks}
                />
            </ProfileHeaderSection>
            <ProfileHeaderSection 
                header={'Your Most Liked Artists'} 
                onExpand={() => setAllArtists(!allArtists)}
                isExpanded={allArtists}
            >
                <MostLikedTracks 
                    tracks={artists}
                    showAll={allArtists}
                />
            </ProfileHeaderSection>
        </div>
    )
}