/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {usePwaInstall} from "../../../hooks/usePwaInstall";
import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import {safariHome, safariShare} from "../../../images";
import {Common} from "../../../utils/common";


export const PwaInstall = () => {
    const [isVisible, setVisibleState] = useState(false);

    const hide = () => setVisibleState(false);

    useEffect(() => {
        if (Common.isSafari()) {
            setTimeout(() => {
                // window.matchMedia('(display-mode: standalone)').matches  android
                // @ts-ignore
                // alert(navigator.standalone)
                // @ts-ignore
                if (!navigator.standalone) {
                    setVisibleState(true)
                }
            }, 2000)
        }
    }, [])

    if (!isVisible) {
        return <></>;
    }

    return (
        <div css={_css}>
            <div className={"head"}>
                <div className={"close"} onClick={()=>setVisibleState(false)}>关闭</div>
            </div>
            <div className={"favirate"}>保存此网站,收藏不迷路</div>
            <div className={"desc"}>
                1.点击浏览器底部<img style={{height: "26px"}} src={safariShare}/> 按钮
            </div>
            <div>
                <div>2.弹出菜单中选择"添加到主屏幕"</div>
                <div>
                    <img src={safariHome}/>
                </div>
            </div>
        </div>
    );
}

const _css = css`
  position: fixed;
  bottom: 0;
  z-index: 10;
  background: #ffffff;
  width: 100vw;
  padding: 10px;
  min-height: 100px;

  .favirate {
    font-size: 22px;
  }

  .desc {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .close {
    font-size: 18px;
  }
`
