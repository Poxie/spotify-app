import React, { useState } from "react"
import { Button } from "../../components/Button"
import { Clickable } from "../../components/Clickable"
import { Flex } from "../../components/Flex"
import { Track } from "../../types/Track"
import { SmallPlayer } from "../home/SmallPlayer"
import { Header } from "./Header"

interface Props {
    tracks: Track[];
    showMore: () => void;
}
export const Recommendations: React.FC<Props> = ({ tracks, showMore }) => {
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
            <Button type={'transparent'} onClick={showMore}>
                Load More
            </Button>
        </div>
    )
}