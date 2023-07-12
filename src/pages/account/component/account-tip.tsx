/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Alert} from "react-bootstrap";

export const AccountTip = () => {
    return <>
        <Alert variant={"danger"}>
            请妥善保管好您的账号,丢失不可找回.账号用于登录APP,不需要密码,以确保您的隐私得以保护.
        </Alert>
    </>
}

