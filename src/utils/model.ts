export interface SessionStatusResponse {
    status: number;
    service_status: ServiceStatus;
}

export interface ServiceStatus {
    current_plan: string;
    payment_method: string;
    is_active: boolean;
    active_until: number;
    is_renewable: string;
    will_auto_rebill: string;
    is_on_free_trial: boolean;
    capabilities: null;
    limit: number;
    /**
     * 代理状态
     */
    agent_status: string;
    /**
     * 上级代理
     */
    parent: string;
    /**
     * 邀请码
     */
    share_code: string;
    /**
     * uid
     */
    userId: any;
    /**
     * 用户返佣比例
     */
    rate: number;
}

export interface SessionNewResponse {
    token: string;
    status: number;
    vpn_username: string;
    vpn_password: string;
    service_status: ServiceStatus;
}

/**
 * 代理申请状态
 */
export enum AgentStatus {
    /**
     * 未申请
     */
    UnApply = "0",
    /**
     * 已申请
     */
    Apply = "1",
    /**
     * 申请通过
     */
    Applyed = "2",
    /**
     * 申请已拒绝
     */
    ApplyReject = "3"
}

/**
 * 产品列表
 */

// export type ProductType = "Trail" | "Standard" | "Pro"

export enum ProductType {
    Trail = "Trial",
    Standard = "Standard",
    Pro = "Pro"
}
