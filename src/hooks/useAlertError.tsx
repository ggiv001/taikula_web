import {Alert} from "react-bootstrap";
import {useState} from "react";
import {AlertEx} from "../components/alert";

export const useAlertError = () => {
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);

    const AlertUi = () => {
        return <>
            {
                show && <AlertEx
                    onClose={() => setShow(false)}
                    title={"出现错误"}
                    variant={"danger"}
                    message={message}/>
            }
        </>
    }

    function showAlert(msg: string) {
        setShow(true);
        setMessage(msg);
    }

    return {AlertUi, showAlert}
}
