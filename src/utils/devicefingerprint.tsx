import DeviceDetector from "device-detector-js";
import {Common} from "./common";
import MD5 from 'crypto-js/md5';

export const DeviceFingerprint = {
    get: () => {
        return new Promise(async (resolve, reject) => {

            const publicIp = await Common.getPublicIp();
            console.log("public ip:", publicIp)

            const localIp = await  Common.getLocalIp();
            console.log("local ip:",localIp)


            if (!publicIp) {
                reject("error");
            } else {
                let sysName;
                let sysVer;
                let brand;
                let brandModel;
                const deviceDetector = new DeviceDetector();
                const userAgent = navigator.userAgent;

                const device = deviceDetector.parse(userAgent);

                // 系统类型
                if (device && device.os) {
                    sysName = device.os.name.toLowerCase();
                    sysVer = device.os.version.toLowerCase();
                }
                if (device && device.device) {
                    brand = device.device.brand ? device.device.brand.toLowerCase() : '';
                    brandModel = device.device.model ? device.device.model.toLowerCase().replaceAll(" ", "") : '';
                }

                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;

                const lang = navigator.language.toLowerCase();

                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
                const hash = `${publicIp}*${sysName}*${sysVer}*${brand}*${brandModel}*${screenWidth}*${screenHeight}*${lang}*${timezone}`;

                // alert("hash:" + hash);

                const deviceId = MD5(hash);

                resolve({hash: hash, id: deviceId.toString(), ua: userAgent});
            }

        })
    }
}
