/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Android, Ios, Linux, MacOs, Windows} from "../../../images";
import {config} from "../../../utils/config";
import {cache} from "../../../utils/cache";
import {Alert, Button} from "react-bootstrap";
import {useSessionStatus} from "../../../hooks/useSessionStatus";
import {Router} from "../../../utils/router";
import Modal from "../../../components/modal";
import CopyText from "copy-to-clipboard";

export const SectionDownload = () => {
    const {accountId} = useSessionStatus(false);

    const token = cache.get(config.token);
    const isLogin = !!token;

    function onClickDown(url: string) {
        Modal.config({
            title: "下载提示",
            children: <DownloadTips url={url}/>,
            closeTitle: "关闭",
            confirmTitle: "",
        });
    }

    function copyAccount() {
        if (accountId) {
            const copyRet = CopyText(accountId);
            Modal.toast("复制成功");
        }
    }

    const DownloadTips = ({url}: any) => {
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
        `;
        return <div css={_downCss}>
            <div>
                {/* <div className="tip1">您的唯一账号</div>
                <Alert variant="primary">
                    {accountId} <Button variant="outline-danger" className="account-action-button"
                                        onClick={copyAccount}>复制账号</Button>
                </Alert>
                <div className="tip2">复制此账号在APP中登录,如需捐赠/续费服务,请在巨人官网中进行.</div> */}
                <div>官方地址: www.taikula.life</div>
            </div>
            <div className="downtip"><a href={url} target="_blank">点击下载APP</a></div>
        </div>
    }

    return <>
        <section id="download" css={_css} className={"pb-90"}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section-title title-shape text-center">
                            <h2>下载 泰酷辣 </h2>
                            <p>适配全平台,点击您需要的APP进行下载
                            </p>
                            <p className="download-tips">
                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <Alert variant="danger">
                                            <p>
                                                请先登录后下载文件
                                            </p>
                                        </Alert>
                                    </a>
                                }
                                {
                                    isLogin && <Alert variant="warning">
                                        <p>
                                            泰酷辣面向全球用户进行公测,暂定公测时间为期一个月,苹果用户只能下载测试版使用.
                                        </p>
                                    </Alert>
                                }

                            </p>
                        </div>
                    </div>
                </div>
                <div className="justify-content-center app-elements-container row">

                    {
                        config.download.android && <>
                            <div className="app-element-wrapper">
                                {
                                    isLogin && <a onClick={() => onClickDown(config.download.android)}>
                                        <Android/>
                                        <span className="icon-title">Android</span>
                                    </a>
                                }
                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <Android/>
                                        <span className="icon-title">Android</span>
                                    </a>
                                }
                            </div>
                        </>
                    }

                    {
                        config.download.iOS && <>
                            <div className="app-element-wrapper">
                                {
                                    isLogin && <a onClick={() => onClickDown(config.download.iOS)}>
                                        <Ios/>
                                        <span className="icon-title">iOS</span>
                                    </a>
                                }

                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <Ios/>
                                        <span className="icon-title">iOS</span>
                                    </a>
                                }

                            </div>
                        </>
                    }

                    {
                        config.download.iPad && <>
                            <div className="app-element-wrapper">
                                {
                                    isLogin && <a onClick={() => onClickDown(config.download.iPad)}>
                                        <Ios/>
                                        <span className="icon-title">iPad</span>
                                    </a>
                                }
                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <Ios/>
                                        <span className="icon-title">iPad</span>
                                    </a>
                                }

                            </div>
                        </>
                    }

                    {
                        config.download.macos && <>
                            <div className="app-element-wrapper">
                                {
                                    isLogin && <a onClick={() => onClickDown(config.download.macos)}>
                                        <MacOs/>
                                        <span className="icon-title">macOS</span>
                                    </a>
                                }
                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <MacOs/>
                                        <span className="icon-title">macOS</span>
                                    </a>
                                }

                            </div>
                        </>
                    }

                    {
                        config.download.windows && <>
                            <div className="app-element-wrapper">
                                {
                                    isLogin && <a onClick={() => onClickDown(config.download.windows)}>
                                        <Windows/>
                                        <span className="icon-title">Windows</span>
                                    </a>
                                }
                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <Windows/>
                                        <span className="icon-title">Windows</span>
                                    </a>
                                }

                            </div>
                        </>
                    }

                    {
                        config.download.linux && <>
                            <div className="app-element-wrapper">
                                {
                                    isLogin && <a onClick={() => onClickDown(config.download.linux)}>
                                        <Linux/>
                                        <span className="icon-title">Linux</span>
                                    </a>
                                }
                                {
                                    !isLogin && <a href={Router.LoginPage} target="_blank">
                                        <Linux/>
                                        <span className="icon-title">Linux</span>
                                    </a>
                                }
                            </div>
                        </>
                    }

                </div>
            </div>
        </section>
    </>
}

const _css = css`
  display: flex;
  flex-direction: row;

  & .download-tips {
    margin-top: 14px !important;
  }

  & .app-elements-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    & .app-element-wrapper {
      width: 118px;
      height: 118px;
      border: 1px solid #e8e8fe;
      border-radius: 8px;
      transition: ease-in .3s;
      margin: 0 3px 10px;

      & a {
        width: 118px;
        height: 118px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-left: -10px;

        .icon-title {
          color: #222e3a;
          font-size: 18px;
          line-height: 26px;
          text-align: center;
          letter-spacing: -.2px;
          font-weight: 300;
          display: block;
          margin-top: 8px;
        }
      }
    }
  }
`
