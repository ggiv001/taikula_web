import {createRoot} from "react-dom/client";
import {ModalUi} from "./modal-ui";
import {LoadingUi} from "./loading-ui";
import {ToastUi} from "./toast-ui";

export const ModalInstance = (props = {}) => {
    let modalRoot = document.querySelector("#modal-root") as HTMLElement;
    if (!modalRoot) {
        modalRoot = document.createElement('div')
        modalRoot.className="modal"
        document.body.appendChild(modalRoot)
    }
    // @ts-ignore
    if (!window['modalContainer']) {
        // @ts-ignore
        window['modalContainer'] = createRoot(modalRoot);
    }
    // @ts-ignore
    window['modalContainer'].render(<ModalUi key={Math.random()} {...props}/>);
    // @ts-ignore
    // return window['modalContainer'];
}

export const LoadingInstance = (props: {}) => {
    let modalRoot = document.querySelector("#loading-root") as HTMLElement;
    if (!modalRoot) {
        modalRoot = document.createElement('div')
        modalRoot.className="loading"
        document.body.appendChild(modalRoot)
    }
    // @ts-ignore
    if (!window['loadingContainer']) {
        // @ts-ignore
        window['loadingContainer'] = createRoot(modalRoot);
    }
    // @ts-ignore
    window['loadingContainer'].render(<LoadingUi key={Math.random()} {...props}/>);
}

export const ToastInstance = (props = {}) => {
    let modalRoot = document.querySelector("#toast-root") as HTMLElement;
    if (!modalRoot) {
        modalRoot = document.createElement('div')
        modalRoot.className="toast"
        document.body.appendChild(modalRoot)
    }
    // @ts-ignore
    if (!window['toastContainer']) {
        // @ts-ignore
        window['toastContainer'] = createRoot(modalRoot);
    }
    // @ts-ignore
    window['toastContainer'].render(<ToastUi key={Math.random()} {...props}/>);
    // @ts-ignore
    // return window['modalContainer'];
}
