import axios, { AxiosRequestConfig } from "axios";
import { config } from "./config";
import { cache } from "./cache";
import Modal from "../components/modal";
import { AgentStatus, ProductType } from "./model";


const apiUrl = {
    /**
     * 产品列表
     */
    productList: "/v4/product/list",
    /**
     * 获取单个产品
     */
    getProductByMethod: "/v4/product/getProductByMethod?method=",
    /**
     * 创建新账号
     */
    newAccount: "/v4/account/new",
    newAccountByEmail: "/v4/account/new/email",
    /**
     * 邮箱验证码
     */
    captchaEmail: "/v4/account/new/email/send",
    captchaEmailToFind: "/v4/account/find/email/send",
    /**
     * 登录
     */
    newSession: "/v4/session/new",
    newSessionByEmail: "/v4/session/new/mail",
    /**
     * 创建订单
     */
    createPayment: "/v4/account/payment/create",
    checkPayment: "/v4/account/payment/query",
    /**
     * 支付
     */
    newSubscriptions: "/subscriptions/new",
    /**
     * 获取订单信息
     */
    getSubByOid: "/subscriptions/getSubandProdByOid?oid=",
    /**
     * 获取账号信息
     */
    sessionStatus: "/v4/session/status",
    /**
     * 退出登录
     */
    sessionDelete: "/v4/session/delete",
    /**
     * 合伙人申请
     */
    partnerApply: "/user/agentApply",
    /**
     * 我的返佣信息
     */
    getMineData: "/wallet/getMineData?token=",
    /**
     * 我的交易流水
     */
    getWallectRecord: "/wallet/getWallectRecord?token={token}&types={types}",
    /**
     * 返佣人数信息
     */
    getAgentTeamData: "/agent/getAgentTeamData?token=",
    /**
     * 下级列表
     */
    getAgentSubList: "/agent/getSubList?token={token}",
    /**
     * 合伙人审核
     */
    partnerAudit: "/agent/agentAudit",
    /**
     * 提现申请
     */
    withdrawApply: "/wallet/withdrawApply",

    /**
     * 更新返佣比例
     */
    updateRate: "/agent/updateRate",
}

axios.defaults.baseURL = config.getBaseApi();
axios.defaults.timeout = config.TIME_OUT;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    Modal.loading(false);
    return config;
}, function (error) {
    // 对请求错误做些什么
    Modal.loading(false);
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    Modal.loading(false);
    return response;
}, function (error) {
    Modal.loading(false);
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // return Promise.reject(error);
    // console.log("error 11:", error);

    try {
        const msg = error.response.data.msg;
        if (msg)
            Modal.warn(msg, () => {
            });
    } catch (e) {
        Modal.warn("操作失败", () => {
        });
    }

    return error
});

const http = {
    getProductList: async () => {
        return await http.get(apiUrl.productList);
    },
    getProductByMethod: async (productType: ProductType | string) => {
        if (!productType) {
            productType = ProductType.Standard;
        }
        return await http.get(apiUrl.getProductByMethod + productType)
    },
    newAccount: async (shareCode: any) => {
        return await http.post(apiUrl.newAccount, {
            product_name: config.client,
            shareCode: shareCode
        });
    },
    newAccountByEmail: async (share_code: any, user_name: string, captcha: string, passwd: string, re_passwd: string) => {
        return await http.post(apiUrl.newAccountByEmail, {
            product_name: config.client,
            share_code: share_code,
            user_name: user_name,
            captcha: captcha,
            passwd: passwd,
            re_passwd: re_passwd
        });
    },
    captchaEmail: async (email: string) => {
        return await http.post(apiUrl.captchaEmail, {
            email: email
        });
    },
    captchaEmailToFind: async (email: string) => {
        return await http.post(apiUrl.captchaEmailToFind, {
            email: email
        });
    },
    newSession: async (username: string, app_name: string) => {
        return await http.post(apiUrl.newSession, {
            username: username,
            app_name: app_name
        })
    },
    newSessionByEmail: async (username: string, passwd: string) => {
        return await http.post(apiUrl.newSessionByEmail, {
            username: username,
            passwd: passwd,
            app_name: config.client
        })
    },
    sessionStatus: async () => {
        if (cache.get(config.token)) {
            return await http.post(apiUrl.sessionStatus, {
                session_token: cache.get(config.token)
            });
        }
    },
    sessionDelete: async () => {
        return await http.post(apiUrl.sessionDelete, {
            session_token: cache.get(config.token)
        })
    },
    createPayment: async (period: number, product_id: number) => {
        return await http.post(apiUrl.createPayment, {
            period: period,
            product_id: product_id,
            token: cache.get(config.token),
        })
    },
    checkPayment: async (order_id: number) => {
        return await http.post(apiUrl.checkPayment, {
            order_id: order_id,
            token: cache.get(config.token),
        })
    },
    newSubscriptions: async (token: string, product_id: string, period: number, pay_method: string, amount: number, unit?: string, returnUrl?: string
    ) => {
        return await http.post(apiUrl.newSubscriptions, {
            token: token,
            product_id: product_id,
            period: period,
            pay_method: pay_method,
            amount: amount,
            unit: unit,
            returnUrl: returnUrl
        })
    },
    getSubByOid: async (orderId: any) => {
        return await http.get(apiUrl.getSubByOid + orderId);
    },
    partnerApply: async (email: string, password: string, telegram?: string, cloudchat?: string) => {
        return await http.post(apiUrl.partnerApply, {
            token: cache.get(config.token),
            email: email,
            withdraw_pwd: password,
            telegram: telegram,
            cloudchat: cloudchat
        })
    },
    /**
     * 获取交易流水 2:提现,9:推荐佣金
     * @param types
     */
    getWallectRecord: async (types: string) => {
        const token = cache.token();
        return await http.get(apiUrl.getWallectRecord
            .replace("{token}", token)
            .replace("{types}", types));
    },
    getMineData: async () => {
        const token = cache.token();
        return await http.get(apiUrl.getMineData + token);
    },
    getAgentTeamData: async () => {
        const token = cache.token();
        return await http.get(apiUrl.getAgentTeamData + token);
    },
    getAgentSubList: async (status?: AgentStatus | string) => {
        const token = cache.token();
        let url = apiUrl.getAgentSubList.replace("{token}", token)
        if (status) {
            url = url + "&agentStatus=" + status;
        }
        return await http.get(url);
    },
    partnerAudit: async (id: any, rate: any, status: string) => {
        return await http.post(apiUrl.partnerAudit, {
            token: cache.token(),
            id: id,
            rate: rate,
            status: status
        });
    },
    withdrawApply: async (address: string, withdraw_pwd: string, amount: any) => {
        const _response: any = await http.post(apiUrl.withdrawApply, {
            token: cache.token(),
            currency: "USDT",
            address: address,
            withdraw_pwd: withdraw_pwd,
            amount: amount,
        })
        console.log("_response", _response)
        const { response, data: _data } = _response;
        if (_data) {
            return _data;
        }
        const { data } = response;
        console.log("data", data);
        return data;
    },

    /**
     * 更新返佣比例
     * @param userId
     * @param rate
     */
    updateRate: async (userId: string, rate: any) => {
        const response = await http.post(apiUrl.updateRate, {
            token: cache.token(),
            userId: userId,
            rate: rate,
        })
        return response;
    },

    get: (method: string) => {
        return axios.get(method);
    },
    post: (method: string, data: any, config?: AxiosRequestConfig<any>) => {
        return axios.post(method, data, config);
    },
}

export {
    http,
    apiUrl
}
