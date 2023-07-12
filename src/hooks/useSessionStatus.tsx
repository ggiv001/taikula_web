import {useEffect, useState} from "react";
import {ServiceStatus} from "../utils/model";
import {AccountUtil} from "../utils/account";
import {useNavigate} from "react-router-dom";
import {Router} from "../utils/router";

export const useSessionStatus = (isJump = true) => {
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>();
    const [status, setStatus] = useState<number>();
    const [accountId, setAccountId] = useState<string>();
    const push = useNavigate();

    async function getSessionStatus() {
        const response = await AccountUtil.sessionStatus();
        if (response) {
            setServiceStatus(response.service_status);
            setStatus(response.status);
            const _accountId = AccountUtil.getAccountId();
            const _token = AccountUtil.getToken();
            if (!_token) {
                if (isJump) {
                    push(Router.LoginPage)
                }
            }
            if (_accountId) {
                setAccountId(_accountId);
            }
        } else {
            if (isJump) {
                push(Router.LoginPage)
            }
        }
    }

    useEffect(() => {
        getSessionStatus();
    }, [])

    return {serviceStatus, status, accountId}
}
