import {Common} from "./common";
import {config} from "./config";

const cache = {
    token() {
        return cache.get(config.token);
    },
    get: (key: string) => {
        const ret = localStorage.getItem(key);
        const isJson = Common.isJson(ret);
        if (isJson) {
            if (ret) {
                return JSON.parse(ret);
            } else {
                return null;
            }
        } else {
            return ret;
        }
    },
    set: (key: string, value: any) => {
        const canConvertJson = Common.canConvertJson(value);
        if (canConvertJson) {
            const json = JSON.stringify(value);
            localStorage.setItem(key, json);
        } else {
            localStorage.setItem(key, value);
        }
    },
    delete: (key: string) => {
        localStorage.removeItem(key);
    }
}

export {cache}
