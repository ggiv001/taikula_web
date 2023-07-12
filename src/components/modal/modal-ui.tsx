import {Button, Modal} from "react-bootstrap";
import {ForwardedRef, forwardRef, ReactNode, useState} from "react";

export type ModalUiProps = {
    title?: string;
    closeTitle?: string;
    confirmTitle?: string;
    children?: ReactNode | string;
    onClose?: any;
    onConfirm?: any;
}

export const ModalUi = ((props: ModalUiProps) => {
    const {onClose, onConfirm} = props;
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        if (onClose) {
            onClose();
        }
    };
    const handleShow = () => setShow(true);

    const btnClickConfirm = () => {
        if (onConfirm) {
            const ret = onConfirm();
            if (ret) {
                handleClose();
            }
        }
    }

    return <>
        <Modal animation={false}
               aria-labelledby="contained-modal-title-vcenter"
               centered
               show={show}
               onHide={handleClose}>
            {
                props.title && <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
            }
            <Modal.Body>
                {
                    props.children
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    props.closeTitle && <Button variant="secondary" onClick={handleClose}>
                        {props.closeTitle}
                    </Button>
                }
                {
                    props.confirmTitle && <Button variant="primary" onClick={btnClickConfirm}>
                        {props.confirmTitle}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </>
})
