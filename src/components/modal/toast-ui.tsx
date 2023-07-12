import { Toast, ToastContainer } from "react-bootstrap";
import { ToastPosition } from "react-bootstrap/ToastContainer";
import { useToggle } from "../../hooks/useToggle";

export interface ToastUiProps {
    position: ToastPosition;
    title: string;
    content: string | any;
    autohide: boolean;
    bg: string;
    isMessage: boolean;
}

export const ToastUi = ({ position = "top-center", content, title = "提示", autohide = false, bg = '', isMessage = false }: ToastUiProps) => {
    const { toggle, status } = useToggle(true);

    return <>
        <ToastContainer className="p-3" position={position} >
            <Toast show={status} onClose={toggle} autohide={autohide} delay={2000} bg={bg}>
                <Toast.Header closeButton={!isMessage}>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body className="Success" style={{ color: isMessage ? '#fff' : '#000' }}>
                    {
                        content
                    }
                </Toast.Body>
            </Toast>
        </ToastContainer>
    </>
}
