import { useModal } from "../contexts/ModalProvider"
import { CloseIcon } from "../icons/CloseIcon"
import { Clickable } from "./Clickable"
import { Flex } from "./Flex"

interface Props {
    text: string;
    description?: string;
    children?: any;
}
export const ModalHeader: React.FC<Props> = ({ text, description, children }) => {
    const { close } = useModal();

    return(
        <div className="modal-header">
            <Flex className="title" justifyContent={'space-between'} alignItems={'center'}>
                {text}
                <Clickable onClick={close}>
                    <CloseIcon />
                </Clickable>
            </Flex>
            {description && (
                <span className="description">
                    {description}
                </span>
            )}
            {children}
        </div>
    )
}