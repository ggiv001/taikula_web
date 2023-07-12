const config = {
    token: "jr_token",
    plan: "jr_plan",
    shareCode: "jr_share_code",
    accountId: "jr_account",
    genAccountId: "gen_account",
    deadline:"2023-10-1",
    // teachingLink:"https://www.qukuai520.com/html/54/",
    teachingLink:"../usdt.html",
    // baseApi: "https://api.taikula.life/",
    // baseApi: "http://localhost:8081/",
    getBaseApi: () => {
        const forceProd = false;
        if (process.env.NODE_ENV === "development" && !forceProd) {
            // return "http://192.168.50.69:8081/";
            return "https://api-dev.jrvpn.net/";
        } else {
            return "https://api.taikula.life/";
        }
    },
    TIME_OUT: 15000 * 2,
    client: "VPN For Web",
    quanyi: [
        "所有线路可用",
        "支持{limit}台设备",
        "国际专线大带宽",
        "不限流量",
        "专业隐私保护",
        "拦截广告和恶意软件"
    ],
    domain: "https://www.taikula.life",
    download: {
        // android: "http://120.232.254.188:1024/taikula-production-release-1.0.apk",
        android: "https://www.taikula.life/taikula-site-release-1.1.apk",
        iOS: "https://testflight.apple.com/join/7teFbgEW",
        iPad: "https://testflight.apple.com/join/7teFbgEW",
        windows: "",
        macos: "",
        linux: "",
    },
    planName: (plan: string) => {
        switch (plan) {
            case "Trail":
                return "免费版";
            case "Standard":
                return "标准版";
            case "Pro":
                return "专业版";
        }
        return "免费版";
    }
}

export {config}
