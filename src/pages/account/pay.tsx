/** @jsxImportSource @emotion/react */
import { FragmentAccount } from "../../components/layouts/fragment-account";
import { Button, Badge } from "react-bootstrap";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Router } from "../../utils/router";
import { http } from "../../utils/http";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { Line } from "../../components/line";
import { QRCodeSVG } from "qrcode.react";
import CopyText from 'copy-to-clipboard';
import { AccountIndexPage } from './index';
import { setTimeout } from "timers/promises";


export const PayPage = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const push = useNavigate();
    const info = useLocation().state;
    const [params] = useSearchParams();

    const [payStatus, setPayStatus] = useState(0)

    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

    const now: any = Math.round(new Date().getTime() / 1000).toString();
    const end: any = Math.round(new Date(info.expires_time).getTime() / 1000).toString();
    let countDown = end - now
    let cd: number = countDown;
    let timer: any = null;

    const dealData = () => {
        if (cd <= 0) {
            setTime({ ...time, h: 0, m: 0, s: 0 });
            return timer && clearTimeout(timer);
        }
        const d = parseInt(cd / (24 * 60 * 60) + '');
        const h = parseInt(((cd / (60 * 60)) % 24) + '');
        const m = parseInt(((cd / 60) % 60) + '');
        const s = parseInt((cd % 60) + '');
        setTime({ ...time, h: h, m: m, s: s });
        cd--;
        timer = window.setTimeout(() => {
            dealData();
        }, 1000);
    };

    function copy() {
        CopyText(info.pay_address);
        Modal.info("复制成功", null, {
            closeTitle: "关闭",
            confirmTitle: ""
        });
    }

    async function finishPay() {
        const { data: res } = await http.checkPayment(info.order_id)
        setPayStatus(res.status)
        if (res.status == 1) {
            Modal.info("支付成功", null, {
                closeTitle: "关闭",
                confirmTitle: ""
            });
            window.setTimeout(() => {
                push(Router.AccountPage)
            }, 1000);
        } else {
            const msg = res.status == 0 ? '如已支付，请等待系统确认' : '订单已超时'
            Modal.info(msg, null, {
                closeTitle: "关闭",
                confirmTitle: ""
            });
        }
    }


    useEffect(() => {
        setPayStatus(info.status)
        dealData();
        return () => {
            timer && clearTimeout(timer);
        }
    }, [params]);

    return (
        <>
            <FragmentAccount>
                <div css={_css} >
                    <div className="pay-box">
                        <div className="pay-top">
                            <div>请使用支持波场网络(tron)的钱包进行转账</div>
                            <div className="transaction">
                                <div>{payStatus == 0 ? '待支付' : payStatus == 1 ? '支付成功' : '支付逾期'}</div>
                                <div>{info.amount} USDT</div>
                                <div className="address">
                                    <span className="address-text">
                                        {info.pay_address}
                                    </span>
                                    <Button className="copy-button" variant="outline-secondary" size="sm" onClick={() => copy()}>复制</Button>
                                </div>
                                <div className="code-box">
                                    <QRCodeSVG value={info.pay_address} />
                                </div>
                                <div>{time.h < 10 ? '0' + time.h : time.h} ：{time.m < 10 ? '0' + time.m : time.m} ：{time.s < 10 ? '0' + time.s : time.s}</div>
                            </div>
                        </div>
                        <div className="pay-button">
                            <Button variant="secondary" size="lg" onClick={() => { window.history.back() }}>狠心离开</Button>
                            <Button variant="secondary" size="lg" onClick={() => finishPay()}>我已支付</Button>
                        </div>
                        <Line />
                        <div>
                            <div>1. 请在60分钟之内完成付款，超时付款不会到账。</div>
                            <div>2. 转账金额需与上方显示的订单金额一致，否则系统不到账。</div>
                            <div>3. 点击金额和地址区域可直接复制。</div>
                            <div>4. 如扫码后无法付款，请直接粘贴地址及金额进行付款操作。</div>
                            <div>5. 如出现转账金额与订单金额不一致系统未到账的情况，请联系管理员。</div>
                        </div>
                    </div>
                </div>
            </FragmentAccount>
        </>
    );
};

const _css = css`
.pay-box{
    background: #ffffff;
    border-radius: 12px;
    padding: 30px 15px;
    margin-bottom: 10px;
    overflow: hidden;
    .pay-top{
        text-align: center;
    }
    .transaction{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 600;
        color: #000;
        font-size: 18px;
        >div{
            margin-top: 10px;
        }
        .address{
            font-weight: 400;
            margin-bottom: 10px;
            .address-text{
                display: inline-block;
                background: #f7f4f4;
                padding:5px 8px;
                margin: 3px;
                border-radius: 15px;
                font-size: 16px;
            }
            .copy-button{
                margin-left: 5px;
                padding: 10px 18px;
            }
        }
    }

    .code-box{
        width: 100%;
        >svg{
            width: 70%;
            height: auto;
        }
    }

    .pay-button{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }
}
`