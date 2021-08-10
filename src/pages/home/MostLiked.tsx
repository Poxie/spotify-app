import React, { useEffect, useRef, useState } from "react"
import { Clickable } from "../../components/Clickable";
import { Flex } from "../../components/Flex";
import { Track } from "../../types/Track"
import { SmallPlayer } from "./SmallPlayer";

interface Props {
    items: Track[];
}
export const MostLiked: React.FC<Props> = ({ children, items }) => {
    const [active, setActive] = useState(0);
    const container = useRef<HTMLDivElement>(null);
    const amount = items.length;

    useEffect(() => {
        if(!container.current) return;
        let currentSlide = active;
        if(active < 3) {
            currentSlide = 0;
        } else if(active > amount - 3) {
            currentSlide = amount - 3;
        }

        container.current.style.transform = `translate3d(-${currentSlide * (290) - (active < 3 ? 0 : 290 * 2)}px, 0, 0)`;
    }, [active]);

    return(
        <Flex className="most-liked-overflow">
            <div className="most-liked">
                <h1>
                    <span className="underlined">Most</span> Liked Globally
                </h1>
                <Flex className="most-liked-container" ref={container}>
                    {items.map((item, key) => {
                        return(
                            <Clickable key={item.id} onClick={() => setActive(key)}>
                                <SmallPlayer 
                                    durationMS={item.duration_ms}
                                    name={item.name}
                                    album={item.album}
                                    preview={item.preview_url}
                                    active={key === active}
                                />
                            </Clickable>
                        )
                    })}
                </Flex>
            </div>
        </Flex>
    )
}