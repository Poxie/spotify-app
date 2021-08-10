import React, { useEffect, useRef, useState } from "react"
import { Flex } from "./Flex"

interface Props {
    examples: string[];
}
export const InputExamples: React.FC<Props> = ({ examples: inputExamples }) => {
    const [examples, setExamples] = useState([...inputExamples, ...[inputExamples[0]]]);
    const [active, setActive] = useState(0);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setActive(previous => {
                previous += 1;
                if(previous === examples.length) {
                    previous = 0;
                }
                if(previous === examples.length - 1) {
                    setTimeout(() => {
                        if(!ref.current) return;
                        ref.current.style.transition = 'none';

                        setActive(0);
                    }, 600);
                }
                return previous;
            })
        }, 6000);

        return () => {
            if(interval.current) {
                clearInterval(interval.current);
            }
        }
    }, []);

    useEffect(() => {
        if(!ref.current) return;
        if(active === 1) {
            ref.current.style.transition = 'transform .4s ease-in-out';
        }
    }, [active]);

    return(
        <div className="input-examples">
            <div className="example-container" style={{transform: `translate3d(0, -${active}00%, 0)`}} ref={ref}>
                {examples.map((example, key) => {
                    return(
                        <Flex className="input-example" alignItems={'center'} key={key}>
                            Try '{example}'
                        </Flex>
                    )
                })}
            </div>
        </div>
    )
}