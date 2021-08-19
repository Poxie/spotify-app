import React, { useEffect, useRef, useState } from "react"
import { DropdownItem } from "./DropdownItem"
import { Clickable } from "./Clickable";
import './Dropdown.scss';

interface Props {
    items: string[];
    defaultActive?: string;
    onChange?: (id: string) => void;
}
export const Dropdown: React.FC<Props> = ({ items, defaultActive, onChange }) => {
    const [active, setActive] = useState(defaultActive || items[0]);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const checkForClickOutside = (e: MouseEvent) => {
        // @ts-ignore: this works
        if(ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', checkForClickOutside);

        return () => document.removeEventListener('mousedown', checkForClickOutside);
    }, []);

    const handleClick = (id: string) => {
        setActive(id);
        setOpen(false);
        if(onChange) {
            onChange(id);
        }
    }

    return(
        <div className="dropdown" ref={ref}>
            <Clickable className="active-item dropdown-item" onClick={() => setOpen(!open)}>
                {active}
            </Clickable>
            {open && (
                <div className="dropdown-items">
                    {items.map(item => {
                        return(
                            <Clickable 
                                onClick={() => handleClick(item)}
                                key={item.toLowerCase()} 
                            >
                                <DropdownItem 
                                    text={item}
                                    active={item === active}
                                />
                            </Clickable>
                        )
                    })}
                </div>
            )}
        </div>
    )
}