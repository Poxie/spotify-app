import React, { useState } from "react"
import { Clickable } from "../../components/Clickable"
import { Flex } from "../../components/Flex"
import { Track } from "../../types/Track"
import { SmallPlayer } from "../home/SmallPlayer"
import { Header } from "./Header"

interface Props {
    tracks: Track[];
}
export const Recommendations: React.FC<Props> = ({ tracks }) => {
    const [previewMode, setPreviewMode] = useState(false);

    return(
        <div className="recommendations">
            <Header
                text={'You might also like...'}
                className={'expanded'}
            >
                <Clickable className="header-action" onClick={() => setPreviewMode(!previewMode)}>
                    {previewMode ? 'Disable' : 'Enable'} preview mode
                </Clickable>
            </Header>
            <Flex className="recommendation-container" flexWrap={'wrap'} justifyContent={'space-between'}>
                {tracks.map(track => {
                    return(
                        <SmallPlayer 
                            active={true}
                            album={track.album}
                            durationMS={track.duration_ms}
                            name={track.name}
                            preview={track.preview_url}
                            hasControls={previewMode}
                            uri={track.uri}
                            key={track.id}
                        />
                    )
                })}
            </Flex>
        </div>
    )
}