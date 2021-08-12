import React, { useState } from "react"
import { Clickable } from "../../components/Clickable"
import { Tooltip } from "../../components/Tooltip"
import { useAPI } from "../../contexts/ApiProvider"
import { useModal } from "../../contexts/ModalProvider"
import { PlaylistIcon } from "../../icons/PlaylistIcon"
import { ExtraAccessModal } from "../../modals/ExtraAccessModal"
import { PlaylistMenuModal } from "../../modals/PlaylistMenuModal"

interface Props {
    uri: string;
}
export const AddToPlaylist: React.FC<Props> = ({ uri }) => {
    const { setModal } = useModal();

    const openModal = () => {
        if(!window.localStorage.userModifyAccessToken) {
            setModal(<ExtraAccessModal />);
        } else {
            setModal(<PlaylistMenuModal uri={uri} />)
        }
    }

    return(
        <Tooltip className="add-to-playlist" tooltip={'Add to playlist'}>
            <Clickable onClick={openModal}>
                <PlaylistIcon />
            </Clickable>
        </Tooltip>
    )
}