import {http} from "./http";
import {SessionStatusResponse} from "./model";
import {config} from "./config";
import {cache} from "./cache";
import {Router} from "./router";

export const AccountUtil = {
    newAccount: async () => {
        const cacheGenAccountId = cache.get(config.genAccountId);
        if (cacheGenAccountId) {
            return cacheGenAccountId;
        } else {
            const shareCode = cache.get(config.shareCode);
            const ret = await http.newAccount(shareCode);
            const {data} = ret;
            const {account_id} = data;
            if (account_id) {
                cache.set(config.genAccountId, account_id);
                return account_id;
            } else {
                return "";
            }
        }
    },
    newSession: async (username: string) => {
        const cacheSession = cache.get(config.token);
        const cachePlan = cache.get(config.plan);
        if (cacheSession) {
            return {
                token: cacheSession,
                service_status: cachePlan,
            };
        } else {
            const ret: any = await http.newSession(username, config.client);
            const {data} = ret;
            const {token, service_status, message, status} = data;
            if (token) {
                cache.set(config.token, token);
                cache.set(config.accountId, username);
            }
            if (service_status) {
                cache.set(config.plan, service_status);
            }
            return {token, service_status, status, message};
        }
    },
    sessionStatus: async (): Promise<SessionStatusResponse> => {
        try {
            const result: any = await http.sessionStatus();
            const {data} = result;
            const {status} = data;
            if (status !== 200) {
                AccountUtil.clearCache();
                // @ts-ignore
                return null;
            }
            if (data) {
                return data as SessionStatusResponse;
            }
        } catch (e) {
            AccountUtil.clearCache();
        }
        // @ts-ignore
        return null;
    },
    sessionDelete: async () => {
        const result = await http.sessionDelete();
        const {data} = result;
        const {status} = data;
        if (status === 200) {
            AccountUtil.clearCache();
            cache.delete(config.shareCode);
        }
        return true;
    },
    clearCache: () => {
        cache.delete(config.genAccountId);
        cache.delete(config.accountId);
        cache.delete(config.token);
        cache.delete(config.plan);
    },
    newSubscriptions: async (product_id: string, period: number, pay_method: string, amount: number, unit?: string, returnUrl?: string) => {
        const token = cache.get(config.token);
        if (!token) {
            throw new Error("token is empty");
        }
        const ret = await http.newSubscriptions(token, product_id, period, pay_method, amount, unit, returnUrl);
        const {data} = ret;
        console.log("newSubscriptions", data)
        if (!data) {
            return null;
        }
        const {vpn_sub_record, pay_redirect} = data;
        if (vpn_sub_record && pay_redirect) {
            return {vpn_sub_record, pay_redirect};
        } else {
            return null;
        }
    },
    getAccountId: () => {
        let _accountId = cache.get(config.accountId);
        if (!_accountId) {
            _accountId = cache.get(config.genAccountId);
        }
        return _accountId;
    },
    getToken: () => {
        return cache.get(config.token);
    },
    parseQuanYi: (limit: any) => {
        let elements: string[] = [];
        config.quanyi.map((item: string, i: number) => {
            elements.push(`${item.replace("{limit}", limit)}`)
        });
        return <>
            {
                elements.map((item: any, i: number) => {
                    return <li key={i}>{item}</li>
                })
            }
        </>
    }
}

