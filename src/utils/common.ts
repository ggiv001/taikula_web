import { css } from "@emotion/react";
import dayjs from 'dayjs';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';

export const Common = {
    isJson: (str: any) => {
        if (typeof str === 'string') {
            try {
                const obj = JSON.parse(str);
                return !!(typeof obj == 'object' && obj);
            } catch (e) {
                return false;
            }
        }
        return false;
    },
    parseJson(json: string) {
        try {
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    },
    formatToInt(_num: string) {
        try {
            return parseInt(_num);
        } catch (e) {
            return 0;
        }
    },
    canConvertJson: (obj: any) => {
        const _obj = JSON.stringify(obj);
        return Common.isJson(_obj);
    },
    baseFragmentCss: () => {
        return css`
          background: #ffffff;
          padding: 16px;
          border-radius: 8px;
        `;
    },
    unixToDate: (unixStr?: number) => {
        if (unixStr) {
            if (unixStr.toString().length === 10) {
                return new Date(unixStr * 1000);
            } else {
                return new Date(unixStr);
            }
        }
        return null;
    },
    dateFormat: (date: Date, format = "YYYY/MM/DD HH:mm") => {
        return dayjs(date).format(format);
    },
    unixFormat: (unixStr: number) => {
        const date = Common.unixToDate(unixStr);
        if (date) {
            return Common.dateFormat(date);
        }
        return "";
    },
    validEmail: (email: string): boolean => {
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!email) {
            return false;
        }

        return reg.test(email);
    },
    validPassword: (password: string): boolean => {
        if (!password) {
            return false;
        }
        if (password.length < 6 || password.length > 10) {
            return false;
        }
        return true;
    },
    isSafari: () => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
            ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
            ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
            return true;
        } else {
            return false;
        }
    },
    isChrome: () => {
        const userAgentString = navigator.userAgent;
        return userAgentString.indexOf("Chrome") > -1;
    },

    getPublicIp: async () => {
        const publicIp = await publicIpv4();
        return publicIp;
    },

    getLocalIp: () => {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
            pc.createDataChannel('');
            pc.createOffer(pc.setLocalDescription.bind(pc), noop);
            pc.onicecandidate = function (ice) {
                if (!ice || !ice.candidate || !ice.candidate.candidate) return;
                resolve(ice.candidate.candidate);
                pc.onicecandidate = noop;
            };
        });
    }

}
