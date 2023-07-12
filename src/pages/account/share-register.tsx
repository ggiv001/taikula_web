/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Router } from "../../utils/router";
import { AccountUtil } from "../../utils/account";
import { useEffect, useState } from "react";
import { RegistrationBox } from "./component/registration-box";
import { banner_icon, tkl_banner, bannerImg, box, card, check, lock, mainImg, setting, setting2, sheild } from "../../images";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { SectionFeature } from "../index/sections/feature";
import { SectionService } from "../index/sections/service";
import { SectionSolution } from "../index/sections/solution";
import { log } from "console";


export const ShareRegisterPage = () => {
    const push = useNavigate();
    const [params] = useSearchParams();
    const [show, setShow] = useState(false)

    useEffect(() => {
        isWeiXin()
        const token = AccountUtil.getToken();
        if (token) {
            push(Router.AccountPage);
        }
    }, [params]);

    function isWeiXin() {
        const ua = window.navigator.userAgent.toLowerCase();
        const match = ua.match(/MicroMessenger/i);
        if (match && match.includes('micromessenger')) {
            document.body.style.overflow = 'hidden';
            setShow(true)
        } else {
            document.body.style.overflow = 'auto';
            setShow(false)
        }        
    }

    const PopTips = () => {
        const _popCss = css`
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 2000;

            .arrow-img{
                display: inline-block;
                position: absolute;
                right: 30px;
                top: 20px;
                width: 140px;
            }

            .container{
                color: #fff;
                width: 75%;
                height: 150px;
                background-color: transparent;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-sizing: border-box;
                border-radius:150px;
                border: 4px dashed #fff;
                padding: .5em 1em;  
                font-size: 25px;
                font-family: cursive;
                display: flex;
                text-align: center;
                align-items: center;
                font-weight: 600;
            }
        `
        return <div css={_popCss}>
            <div className="arrow-img">
                <svg fill="#fff" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 367.339 367.34" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M337.591,0.932c-13.464,6.12-26.315,12.852-39.168,20.196c-11.628,6.12-25.704,12.24-35.496,21.42 c-5.508,4.896,0,15.3,7.344,12.852c0,0,0.612,0,0.612-0.612c1.836,1.224,3.061,2.448,4.896,4.284c0,0.612,0.611,1.836,0.611,2.448 c0.612,1.224,1.836,2.448,3.061,3.672c-17.748,33.048-34.272,66.096-55.08,96.696c-6.12,9.18-12.853,17.748-20.808,25.704 c-19.584-31.212-51.409-67.32-89.965-60.588c-50.796,9.18-23.256,63.647,3.06,82.008c31.212,22.644,58.14,21.42,85.068,0 c12.24,20.808,20.809,44.063,19.584,66.708c-1.836,54.468-50.796,63.647-91.8,49.571c6.12-15.912,7.956-34.271,4.284-50.184 c-6.12-28.764-50.184-54.468-75.888-34.272c-25.092,20.196,22.032,71.604,37.332,82.009c4.284,3.06,9.18,6.119,14.076,8.567 c-0.612,0.612-0.612,1.225-1.224,1.836c-28.152,44.064-65.484,6.12-82.62-25.092c-2.448-4.896-9.18-0.612-7.344,4.284 c14.076,32.436,42.84,70.38,81.396,48.348c9.18-5.508,17.136-13.464,22.644-23.256c33.66,13.464,72.829,13.464,97.308-17.136 c29.376-36.72,11.017-84.456-8.567-119.952c0.611-0.612,0.611-0.612,1.224-1.224c34.884-33.66,56.304-81.396,78.336-124.236 c4.284,3.06,9.181,6.12,13.464,9.18c3.061,1.836,7.345,1.224,9.792-1.224c17.748-20.808,31.212-45.9,35.496-73.44 C351.055,2.768,344.324-2.128,337.591,0.932z M178.471,207.787c-23.256,13.464-46.512-3.06-63.648-18.972 c-22.644-20.808-16.524-54.468,18.36-47.735c17.748,3.672,31.824,19.584,43.452,32.436c6.12,6.732,12.241,14.687,17.749,23.255 C189.488,201.056,183.979,204.728,178.471,207.787z M116.047,319.171C116.047,319.171,115.435,319.171,116.047,319.171 c-16.524-8.567-28.764-20.808-38.556-36.107c-4.284-6.732-7.956-14.076-9.792-22.032c-6.12-20.808,26.928-10.404,35.496-6.12 C126.451,267.764,124.615,297.14,116.047,319.171z M306.379,67.028c-0.612,0-0.612-0.612-1.224-0.612 c0-1.836-1.225-3.672-3.672-4.896c-4.284-1.836-8.568-4.284-12.853-6.732c-1.836-1.224-5.508-4.896-5.508-3.672 c0-0.612-0.612-1.224-1.224-1.224c6.731-3.672,13.464-8.568,20.195-12.24c8.568-4.896,17.748-9.792,26.929-14.688 C324.74,38.264,316.784,53.564,306.379,67.028z"></path> </g> </g></svg>
            </div>
            <div className="container">
                请点击右上角选择在浏览器打开~
            </div>
        </div>
    }


    return (
        <>
            {show && <PopTips />}
            <Header />
            <div css={_css}>
                <div className="share-register">
                    <div className="container">
                        <div className="row">
                            <div className="share-register-top">
                                <div className="register-banner-icon">
                                    <img src={banner_icon} alt="" />
                                </div>
                                <div className="title-text">
                                    <div>泰酷辣承诺永久免费</div>
                                    <div className="text-second">享受4K专线非一般的速度</div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="registration-box">
                                    <RegistrationBox forget={false} />
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="banner-img-responsive ">
                                    <div className="title-text">
                                        <div>泰酷辣承诺永久免费</div>
                                        <div className="text-second">享受4K专线非一般的速度</div>
                                    </div>
                                    <img
                                        src={bannerImg}
                                        alt="Banner"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SectionFeature />
            <SectionSolution />
            <SectionService />
            <Footer />
        </>
    );
};

const _css = css`

    .share-register{
        color: #fff;
        min-height: 900px;
    }
    .title{
        font:italic 1em Georgia, serif;
        font-size: 25px;
        margin: 10px auto;
        padding: 0 20px;
        .emphasize{
            font-size: 32px;
            color: yellow;
        }
        .second{
            text-align: right;
        }
    }

    .share-register-top{
        position: relative;
        margin-bottom: 20px;
        .register-banner-icon{
            width: 30%;
            position: absolute;
            right: 0;
            top: -10px;
        }
    }
    
    .title-text{
        font-size: 25px;
        font-family: cursive;
        padding: 0 20px;
    }

    .banner-img-responsive{
        display: flex;
        align-items: end;
        justify-content: center;
        height: 100%;
        margin-top: 20px;
        .title-text{
            display: none;
        }
    }

    .registration-box{
        margin: 0 auto;
        padding: 14px;
    }

    @media only screen and (min-width: 992px) {
        .share-register{
            padding-top: 0;
        }
        .title{
            width: 50%;
        }
        .accountFrm {
            color: #ffffff;
            width: 80%;
            margin: 0;
        }
        .tkl-banner{
            max-width: 70%;
        }

        .share-register-top{
            display: none !important;
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 40px;
            .register-banner-icon{
                position: static !important;
                width: 25%;
            }
            .title-text{
                margin-left: 30px;
                width: 50%;
            }
            .text-second{
                text-align: right;
                margin-top: 10px;
            }
        }

        .banner-img-responsive{
            img{
                width: 80%;
            }
            .title-text{
                font-size: 32px;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
  }
`;
