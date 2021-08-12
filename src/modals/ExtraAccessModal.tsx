import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { ModalFooter } from "../components/ModalFooter"
import { ModalHeader } from "../components/ModalHeader"
// @ts-ignore
import { CLIENT_ID, REDIRECT_URI } from '../config.json';
import { useAuthentication } from "../contexts/AuthenticationProvider";
import { useModal } from "../contexts/ModalProvider";

export const ExtraAccessModal = () => {
    const { close } = useModal();
    const { loginModifyAccess } = useAuthentication();
    
    const authorize = () => {
        loginModifyAccess();
        close();
    }

    return(
        <Modal>
            <ModalHeader 
                text={`Extra Access Needed`}
            >
                <span>
                    To be able to add tracks to your playlist we need extra access. We will add, and only if, you agree to add the track.
                </span>
            </ModalHeader>
            <ModalFooter>
                <Button onClick={authorize}>
                    Authorize
                </Button>
            </ModalFooter>
        </Modal>
    )
}