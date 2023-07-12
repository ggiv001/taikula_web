import {bannerImg, box, card, check, lock, mainImg, setting, setting2, sheild} from "../../images";
import {useNavigate} from "react-router-dom";
import {Router} from "../../utils/router";
import {useEffect, useState} from "react";
import {Coupons} from "../coupons";

export const Banner = () => {
    const push = useNavigate();

    return (
        <>
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="banner-content">
                                {/* <h4>守护人间的盾牌</h4> */}
                                <h4>你的互联网浏览超级英雄披风</h4>
                                {/* <h1>匿名畅游全球网络</h1> */}
                                <h1>泰酷辣免费来袭</h1>
                                <p>
                                    无论您身在何处,泰裤辣都可以让您访问被限制的网站和应用程序,以及享受高速,不受限制的互联网连接.
                                </p>
                                <div className="banner-btn-group">
                                    <div className="btn-wrap">
                                        <span></span>
                                        <a className="btn btn-white" onClick={() => push(Router.LoginPage)}>
                                            免费使用
                                        </a>
                                    </div>

                                    {/*<button className="video-btn">*/}
                                    {/*    <span>*/}
                                    {/*        <svg*/}
                                    {/*            stroke="currentColor"*/}
                                    {/*            fill="currentColor"*/}
                                    {/*            strokeWidth="0"*/}
                                    {/*            viewBox="0 0 448 512"*/}
                                    {/*            height="1em"*/}
                                    {/*            width="1em"*/}
                                    {/*            xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*        >*/}
                                    {/*            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>*/}
                                    {/*        </svg>*/}
                                    {/*    </span>*/}
                                    {/*    Play Intro*/}
                                    {/*</button>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="banner-img d-none d-xl-block">
                                <img
                                    src={mainImg}
                                    alt="Main"
                                    className="main-img"
                                />
                                <img
                                    src={setting}
                                    alt="Setting"
                                    className="setting-img"
                                    style={{
                                        transform:
                                            "translate3d(2.54118px, -1px, 0px)",
                                    }}
                                />
                                <img
                                    src={sheild}
                                    alt="Sheild"
                                    className="sheild-img"
                                    style={{
                                        transform:
                                            "translate3d(4.8px, -1.88889px, 0px)",
                                    }}
                                />
                                <img
                                    src={lock}
                                    alt="Lock"
                                    className="lock-img"
                                    style={{
                                        transform:
                                            "translate3d(2.54118px, -1px, 0px)",
                                    }}
                                />
                                <img
                                    src={card}
                                    alt="Card"
                                    className="card-img"
                                    style={{
                                        transform:
                                            "translate3d(4.8px, -1.88889px, 0px)",
                                    }}
                                />
                                <img
                                    src={box}
                                    alt="Box"
                                    className="box-img"
                                    style={{
                                        transform:
                                            "translate3d(4.8px, -1.88889px, 0px)",
                                    }}
                                />
                                <img
                                    src={check}
                                    alt="Check"
                                    className="check-img"
                                    style={{
                                        transform:
                                            "translate3d(2.54118px, -1px, 0px)",
                                    }}
                                />
                                <img
                                    src={setting2}
                                    alt="Setting2"
                                    className="setting2-img"
                                    style={{
                                        transform:
                                            "translate3d(2.54118px, -1px, 0px)",
                                    }}
                                />
                            </div>
                            <div className="banner-img-responsive d-block d-xl-none">
                                <img
                                    src={bannerImg}
                                    alt="Banner"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
