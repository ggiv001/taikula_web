/** @jsxImportSource @emotion/react */
import { FragmentAccount } from "../../components/layouts/fragment-account";
import { Alert, Button } from "react-bootstrap";
import { css } from "@emotion/react";
import { SpinnerEx } from "../../components/spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Router } from "../../utils/router";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";

import { CopyEx } from "../../components/copyex";
import { QRCodeSVG } from 'qrcode.react';
import { useSessionStatus } from "../../hooks/useSessionStatus";
import { config } from "../../utils/config";
import { AccountUtil } from "../../utils/account";
import { ServiceStatus } from "../../utils/model";

import { services_icon1, services_icon2, services_icon3, services_icon4, services_icon5, services_icon6 } from "../../images";

export const InvitationPage = () => {

    const token = AccountUtil.getToken()
    const { serviceStatus } = useSessionStatus();

    const push = useNavigate();
    const [params] = useSearchParams();

    const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

    const now: any = Math.round(new Date().getTime() / 1000).toString();
    const end: any = Math.round(new Date(config.deadline).getTime() / 1000).toString();
    let countDown = end - now
    let cd: number = countDown;
    let timer: any = null;

    const dealData = () => {
        if (cd <= 0) {
            setTime({ ...time, d: 0, h: 0, m: 0, s: 0 });
            return timer && clearTimeout(timer);
        }
        const d = parseInt(cd / (24 * 60 * 60) + '');
        const h = parseInt(((cd / (60 * 60)) % 24) + '');
        const m = parseInt(((cd / 60) % 60) + '');
        const s = parseInt((cd % 60) + '');
        setTime({ ...time, d: d, h: h, m: m, s: s });
        cd--;
        timer = setTimeout(() => {
            dealData();
        }, 1000);
    };


    useEffect(() => {
        dealData();
        return () => {
            timer && clearTimeout(timer);
        }
    }, [params]);

    function onClickShare() {
        Modal.config({
            title: "邀请分享",
            children: <ShareTips />,
            closeTitle: "关闭",
            confirmTitle: "",
        });
    };

    const genShareLink = () => {
        if (serviceStatus?.share_code) {
            return config.domain + "/i/" + serviceStatus?.share_code;
        }
        return ""
    };

    const ShareTips = () => {
        const _downCss = css`
          & .tip1 {
            margin-bottom: 8px;
          }

          & .tip2 {
            color: red;
          }

          & .downtip {
            text-align: center;
            margin-top: 10px;
          }

          & .account-action-button {
            border-radius: 2px;
            //color: red;
          }
          & .qrcode {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            }

          & .shareCodeLink {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            }

        `;
        return token && <div css={_downCss}>
            <div>
                <div className="tip1">邀请信息</div>
                <Alert variant="primary">
                    {/* <Button variant="outline-danger" className="account-action-button"
                        onClick={copyShare}>复制地址</Button> */}

                    <div className={"qrcode"}>
                        {
                            genShareLink() && <QRCodeSVG value={genShareLink()} />
                        }
                    </div>
                    <div className={"shareCodeLink"}>
                        <div>
                            {genShareLink()}
                        </div>
                        <div>
                            <CopyEx content={genShareLink()} />
                        </div>
                    </div>
                </Alert>
                <div className="tip2">复制此地址分享给您的好友注册，注册成功即可享受福利！</div>
                <div>官方地址: www.taikula.life</div>
            </div>
        </div>
    }

    const shareModel = () => {
        return <div css={_css}>
            {token &&
                (<Button
                    onClick={() => onClickShare()}
                    className="share-button"
                    variant="secondary"
                    size="lg"
                >
                    <SpinnerEx loading={false} />
                    去邀请
                </Button>)}
            <div className="count-down">
                距离结束：
                <span>{time.d < 10 ? '0' + time.d : time.d}</span>天
                <span>{time.h < 10 ? '0' + time.h : time.h}</span>时
                <span>{time.m < 10 ? '0' + time.m : time.m}</span>分
                <span>{time.s < 10 ? '0' + time.s : time.s}</span>秒
            </div>
        </div>
    }


    return (
        <>
            <FragmentAccount>
                <div css={_css}>
                    <div className="invitation-title">
                        <div>
                            <div className="title">邀请好友送永久免费会员</div>
                            <div className="desc">
                                邀请好友加入即可领取会员
                            </div>
                            <div className="donate-text" onClick={() => { push(Router.PlanSelectPage) }}>不想邀请？去捐赠获取</div>
                        </div>
                        <div className="share-top">
                            {shareModel()}
                        </div>
                    </div>

                    <div className="invitation-item">
                        <div className="item-title">
                            任务奖励
                        </div>
                        <div className="award-list">
                            <div className="award-description">
                                <div className="description-top">
                                    <div>邀请 <span className="num">5</span> 人注册成功即可获得<span className="text-red">6个月</span>免费会员</div>
                                    <div>邀请 <span className="num">10</span> 人注册成功即可获得<span className="text-red">12个月</span>免费会员</div>
                                </div>
                            </div>
                            <div className="award-description">
                                <div className="description-top">
                                    <div>邀请 <span className="num">15</span> 人注册成功即可获得<span className="text-red">24个月</span>免费会员</div>
                                    <div>邀请 <span className="num">30</span> 人注册成功即可<span className="text-red">永久免费</span>使用</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invitation-list">
                        <div className="invitation-item">
                            <div className="item-title">
                                会员专享 10+ 项特权
                            </div>
                            <div className="privilege">
                                <div className="privilege-content">
                                    <img
                                        src={services_icon1}
                                        alt="/Service Icon"
                                    />
                                    <div className="content-t">免费设备</div>
                                    <div>支持一台</div>
                                </div>
                                <div className="privilege-content">
                                    <img
                                        src={services_icon2}
                                        alt="/Service Icon"
                                    />
                                    <div className="content-t">国际专线</div>
                                    <div>高速上网</div>
                                </div>
                                <div className="privilege-content">
                                    <img
                                        src={services_icon3}
                                        alt="/Service Icon"
                                    />
                                    <div className="content-t">安全访问</div>
                                    <div>各地私密</div>
                                </div>
                                <div className="privilege-content">
                                    <img
                                        src={services_icon4}
                                        alt="/Service Icon"
                                    />
                                    <div className="content-t">无审查</div>
                                    <div>保护隐私</div>
                                </div>
                                <div className="privilege-content">
                                    <img
                                        src={services_icon5}
                                        alt="/Service Icon"
                                    />
                                    <div className="content-t">隐私控制</div>
                                    <div>自定义化</div>
                                </div>
                                <div className="privilege-content">
                                    <img
                                        src={services_icon6}
                                        alt="/Service Icon"
                                    />
                                    <div className="content-t">避免限制</div>
                                    <div>数字自由</div>
                                </div>
                            </div>
                        </div>
                        <div className="invitation-item">
                            <div className="item-title">
                                活动介绍
                            </div>
                            <div className="activity">
                                <div className="activity-tit">活动时间</div>
                                <div className="activity-con"> · 2023-1-1 至 {config.deadline}</div>
                            </div>
                            <div className="activity">
                                <div className="activity-tit">活动规则</div>
                                <div className="activity-con"> · 邀请后需好友注册成功并登录APP，即视为邀请成功获取福利</div>
                                <div className="activity-con"> · 为活动公平性，平台将通过登录设备号验证新用户，免费会员一台设备仅支持注册一个免费账号</div>
                            </div>
                            <div className="activity">
                                <div className="activity-tit">活动声明</div>
                                <div className="activity-con"> · 注意：同一台设备上只允许登录一个账号（一个账号只能在一个固定设备上登录使用），仅限制免费版会员</div>
                                <div className="activity-con"> · 如需一个账号登录多台设备，可通过捐赠方式获得专业版会员，专业版支持7台设备（ <span className="donate-float" onClick={() => { push(Router.PlanSelectPage) }}>去捐赠</span> ）</div>
                                <div className="activity-con"> · 本活动严禁不真实数据作弊行为，一经核实，取消免费会员资格</div>
                            </div>
                        </div>
                    </div>

                    <div className="invitation-item share-box">
                        {shareModel()}
                        <div className="donate-text donate-float" onClick={() => { push(Router.PlanSelectPage) }}>不想邀请？去捐赠获取</div>
                    </div>
                </div>
            </FragmentAccount>
        </>
    );
};

const _css = css`
    .invitation-title{
        color:#fff;
        margin-bottom: 30px;
        & .title {
            font-size: 26px;
            font-weight: bold;
          }
      
          & .desc {
            margin: 16px 0;
          }

        }
        
    .donate-text{
        color: #feff00;
        cursor: pointer;
        :hover{
            color: red;
        }
    }

    .donate-float{
        text-align: center;
        margin-top: 10px;
        padding: 5px 0;
        color: blue;
    }

    .invitation-item{
        background: #ffffff;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 10px;
        overflow: hidden;

        .item-title{
            position: relative;
            font-weight: bold;
            font-size: 18px;
            color: #252525;
            text-align: center;
            margin-bottom: 10px;
            ::after,::before{
                position: absolute;
                top: 50%;
                right: 0;    
                content: ' ';
                display: block;
                width: 20%;
                height: 3px;
                background: linear-gradient(to left, #ffffff, #5551ef);
                border-radius: 5px;
            }   
            ::before{
                left: 0;   
                background: linear-gradient(to right, #ffffff, #5551ef);
            }
        }

        .award-description {
            background: #5b79ff1f;
            margin: 10px 0;
            padding: 10px;

            .description-top {
                >div {
                    margin: 10px 0;
                }
                .num {
                    font-size: 22px;
                    color: #ff7600;
                }
                .text-red{
                    font-size: 20px;
                    color: #e93117;
                }
            }
            .b-num {
                font-size: 22px;
                color: #ff7600;
            }
        }

    }

    .privilege {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        font-size: 14px;
        flex-wrap: wrap;

        .privilege-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
            margin: 10px 0; 
            img {
                width: 50px;
                height: 50px;
            }
            .content-t{
                color: #000;
                margin-top: 7px;
            }
        }
    }
    
    .activity {
        margin: 10px;
        .activity-tit {
            color: #2a2929;
        }
        .activity-con{
            margin: 8px 0;
        }
    }

    .share-top{
        display:none;
    }

    .share-button{
        width: 100%;
        margin-bottom: 10px;
    }
    .count-down{
        text-align: center;
        margin-top: 10px;
        >span {
            color: #e93117;
            font-size: 18px;
            margin: 0 5px;
        }
    }

    @media only screen and (min-width: 992px) {
        .award-list{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .award-description{
                width: 49%;
                padding: 10px 20px;
            }
        }
        .invitation-list{
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .invitation-item{
                width:49%;
            }

            .privilege-content{
                width:50%;
            }
        }
        .share-box{
            display: none;
        }
        .share-top{
            display: block;
        }

        .invitation-title{
            display: flex;
            justify-content: space-between;
            .share-button{
                width:100%;
            }
            .count-down{
                margin-top: 0px;
            }
        }
    }
`;
