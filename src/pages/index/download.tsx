/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import {
    LaunchApp, copy, detector, ua, supportLink,
    isAndroid, isIos, inWeixin, inWeibo
} from 'web-launch-app';

import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react'
import {useEffect, useState} from "react";
import {DeviceFingerprint} from "../../utils/devicefingerprint";

export const DownloadPage = () => {
    const [finger, setFinger] = useState({
        hash: '',
        id: '',
        ua: '',
    });

    const {
        isLoading,
        error,
        data,
    } = useVisitorData();

    const inApp = /appname(.*)/.test(ua);
    // @ts-ignore
    const appVersion = inApp ? /appname\/(\d+(\.\d+)*)/.exec(ua)[1] : '';
    // console.log("isAndroid", isAndroid);
    // console.log("isIos", isIos);
    // console.log("inWeixin", inWeixin);
    // console.log("inWeibo", inWeibo);
    // console.log("inApp", inApp);
    // console.log("detector", detector)

    function btnOpenAndroid() {
        // 应用程序的自定义 URL 协议
        const customUrlScheme = "taikula://";
        let appInstalled = false;
        // 检查应用程序是否已安装
        if (window.navigator && window.navigator.userAgent.match(/Android/i)) {
            // Android
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", customUrlScheme);
            iframe.setAttribute("style", "display:none;");
            document.body.appendChild(iframe);
            setTimeout(function () {
                document.body.removeChild(iframe);
                if (!appInstalled) {
                    // 应用程序未安装，提供下载链接
                    window.location.href = "https://www.taikula.life/taikula-site-release-1.1.apk";
                }
            }, 2000);
        }
    }

    async function getDeviceId() {
        // @ts-ignore
        const {hash, id, ua} = await DeviceFingerprint.get();
        setFinger({
            hash: hash,
            id: id,
            ua: ua
        })
        console.log("deviceId", id)
        console.log("hash", hash)
    }

    useEffect(() => {
        getDeviceId();
    }, [])

    return <div css={_css}>
        <button className="button" onClick={btnOpenAndroid}>打开android</button>
        {/*<div>ua: {ua}</div>*/}
        {/*<div>appVersion: {appVersion}</div>*/}
        {/*<div>isAndroid: {isAndroid + ""}</div>*/}
        {/*<div>isIos: {isIos + ""}</div>*/}
        {/*<div>inWeixin: {inWeixin + ""}</div>*/}
        {/*<div>inWeibo: {inWeibo + ""}</div>*/}
        {/*<div>inApp: {inApp + ""} </div>*/}
        {/*<div>*/}
        {/*    ID:*/}
        {/*</div>*/}
        <div>{finger.ua}</div>
        <div>{finger.hash}</div>
        <div>{finger.id}</div>
    </div>
}

const _css = css`

  & .button {
    background: #0d6efd;
    padding: 18px;
    border-radius: 4px;
    color: white;
  }
`;
