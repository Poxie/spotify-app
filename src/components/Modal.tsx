import { ModalHeader } from "./ModalHeader"
import './Modal.scss';
import { useEffect } from "react";

interface Props {
    header?: string;
    children: any;
    className?: string;
}
export const Modal: React.FC<Props> = ({ children, header, className }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        }
    }, []);

    className = className ? `modal ${className}` : 'modal';
    return(
        <div className={className}>
            {header && <ModalHeader text={header} />}
            {children}
        </div>
    )
}