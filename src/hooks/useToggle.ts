import {useState} from "react";

export const useToggle = (_status?:boolean) => {
    const [status, setStatus] = useState<boolean>(_status!);

    function toggle() {
        setStatus(!status)
    }

    return {toggle, status}
}
