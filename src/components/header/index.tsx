/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Logo } from "../logo";
import { useToggle } from "../../hooks/useToggle";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Router } from "../../utils/router";
import { Coupons } from "../coupons";

export const Header = () => {

    const push = useNavigate();
    const { status, toggle } = useToggle(false);
    const height = window.innerHeight

    const _css = css`
        position: relative;
        .menu-imp{
            position: absolute;
            background: #ffffff !important;
            width: 100vw;
            z-index: 999;
            height:${height - 80}px;
        }

      & .menu-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        background: #ffffff;

        & .item {
          width: 80vw;
          margin: 10px 0;
        }
      }
    `

    function handleShowMenu() {
        toggle();
    }

    function pushTo(url: string) {
        toggle();
        window.location.href = url;
    }

    const lngShow = false;

    return (
        <>
            {/*<Coupons/>*/}
            <header className="header fixed-top">
                <div className="getapp">防迷失,本站永久域名: getapp.fun </div>
                <div className="header-main">
                    <div className="container">
                        <div className="position-relative row" style={{ justifyContent: "space-between" }}>
                            <div className="col-lg-2 col-7">
                                <div className="logo">
                                    <a href="/">
                                        <Logo />
                                    </a>
                                </div>
                            </div>
                            <div
                                className="d-flex align-items-center justify-content-end position-static col-lg-10 col-5">
                                <div className="nav-wrapper">
                                    <div id="menu-button" onClick={handleShowMenu}>
                                        <span></span>
                                    </div>
                                    <div className="nav-wrap-inner ">
                                        <ul className="nav justify-content-end">
                                            <li>
                                                <a
                                                    aria-current="page"
                                                    className="active"
                                                    href="/"
                                                >
                                                    产品
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    aria-current="page"
                                                    className="active"
                                                    href="/account/plan"
                                                >
                                                    价格
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    aria-current="page"
                                                    className="active"
                                                    href="/#service"
                                                >
                                                    服务
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    aria-current="page"
                                                    className="active"
                                                    href="/#download"
                                                >
                                                    下载
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/account/login">我的账号</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {
                                    lngShow && <>
                                        <div className="d-flex align-items-center">
                                            <div className="flag-dropdown ml-3">
                                                <div className="dropdown">
                                                    <button
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        type="button"
                                                        className="dropdown-btn d-flex align-items-center dropdown-toggle btn btn-primary"
                                                    >
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth="0"
                                                            viewBox="0 0 496 512"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                                                        </svg>
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth="0"
                                                            viewBox="0 0 320 512"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                {
                    status && <>
                        <div css={_css}>
                            <div className="menu-imp">

                                <div className="menu-box">
                                    <div className="item">
                                        <a onClick={() => pushTo(Router.IndexPage)}>产品</a>
                                    </div>
                                    <div className="item">
                                        <a onClick={() => pushTo(Router.PlanPage)}>价格</a>
                                    </div>
                                    <div className="item">
                                        <a onClick={() => pushTo("/#service")}>服务</a>
                                    </div>
                                    <div className="item">
                                        <a onClick={() => pushTo("/#download")}>下载</a>
                                    </div>
                                    <div className="item">
                                        <a onClick={() => pushTo(Router.AccountPage)}>我的账号</a>
                                    </div>
                                    <div className="item">
                                        <Link to="/">网址导航</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </header>

        </>
    );
};
