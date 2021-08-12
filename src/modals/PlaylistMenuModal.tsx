import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Flex } from "../components/Flex";
import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal"
import { ModalFooter } from "../components/ModalFooter";
import { ModalHeader } from "../components/ModalHeader"
import { useAPI } from "../contexts/ApiProvider"
import { useAuthentication } from "../contexts/AuthenticationProvider";
import { useModal } from "../contexts/ModalProvider";
import { Playlist as PlaylistType } from "../types/Playlist";
import { LoadingPlaylists } from "./LoadingPlaylists";
import { PlaylistItem } from "./PlaylistItem";
import './PlaylistMenuModal.scss';

interface Props {
    uri: string;
}
export const PlaylistMenuModal: React.FC<Props> = ({ uri }) => {
    const { user } = useAuthentication();
    const { get, post } = useAPI();
    const { close } = useModal();
    const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
    const [active, setActive] = useState('');
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        get('me/playlists?limit=50', true)
            .then(res => res.json())
            .then(response => {
                // @ts-ignore: user will always be a of type User
                setPlaylists(response.items.filter((item: PlaylistType) => item.owner.id === user.id));
            })
    }, []);

    const add = () => {
        if(!active) return;
        setPosting(true);

        post(`playlists/${active}/tracks?uris=${uri}`)
            .then(res => res.json())
            .then(response => {
                if(response.error) {
                    return window.open(window.location.origin + '/authorize/modify');
                }
                close();
            })
    }

    return(
        <Modal>
            <ModalHeader text={`Choose Playlist`}>
                <Flex className="playlist-container scrollbar" flexWrap={'wrap'} justifyContent={'space-between'}>
                    {playlists.length ? (
                        playlists.map(playlist => {
                            const { images, name, id } = playlist;
                            return(
                                <PlaylistItem 
                                    image={images[0]?.url}
                                    name={name}
                                    active={id === active}
                                    id={id}
                                    setActive={setActive}
                                    key={id}
                                />
                            )
                        })
                    ) : (
                        <LoadingPlaylists />
                    )}
                </Flex>
            </ModalHeader>
            <ModalFooter>
                {!posting ? (
                    <Button onClick={add}>
                        Add to playlist
                    </Button>
                ) : (
                    <div style={{padding: '10px 45px'}}>
                        <Loading />
                    </div>
                )}
            </ModalFooter>
        </Modal>
    )
}