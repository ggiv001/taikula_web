/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Copy} from "../images";
import CopyText from 'copy-to-clipboard';
import Modal from "./modal";

export const CopyEx = ({content}: any) => {

    function onClickCopy() {
        const copyRet = CopyText(content);
        // console.log("copy",copyRet)
        Modal.info("复制成功", null, {confirmTitle: ""});
    }

    return <div css={_css} onClick={onClickCopy}>
        {
            content && <Copy/>
        }
    </div>
}

const _css = css`
  & svg {
    width: 40px;
    height: 40px;
  }
`
