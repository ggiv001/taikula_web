import { LoadingInstance, ModalInstance, ToastInstance } from "./instance";
import { ModalUiProps } from "./modal-ui";

const Modal = {
    name: "Modal",
    config(options: ModalUiProps) {
        ModalInstance(options);
    },
    loading(loading: boolean) {
        LoadingInstance({ loading: loading });
    },
    toast(content: string | any, options?: any) {
        ToastInstance({
            position: options,
            content: content,
            ...options
        })
    },
    message(content: string | any, bg?: string) {
        ToastInstance({
            position: 'middle-center',
            content: content,
            autohide: true,
            bg: bg,
            isMessage: true
        })
    },
    info(message: any, onClose?: any, options?: any) {
        return Modal.config({
            title: "提示",
            children: message,
            onClose: onClose,
            closeTitle: "关闭",
            confirmTitle: "确定",
            ...options
        })
    },
    warn(message: any, onClose?: any, options?: any) {
        return Modal.config({
            title: "提示",
            children: message,
            onClose: onClose,
            closeTitle: "关闭",
            confirmTitle: "",
            ...options
        })
    }
}

export default Modal;
