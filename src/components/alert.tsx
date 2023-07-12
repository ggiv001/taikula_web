import {Alert} from "react-bootstrap";

export const AlertEx = ({message, title, canClose = true, onClose, variant}: any) => {
    return <>
        <Alert variant={variant} onClose={onClose} dismissible={canClose}>
            {
                title && <Alert.Heading>{title}</Alert.Heading>
            }
            <p>
                {message}
            </p>
        </Alert>
    </>
}
