/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {LogoSvg,TklSvg} from "../images";

export const Logo = () => {
    return (<div css={_css}>
        <div className={"logoContainer"}>
            {/* <LogoSvg/> */}
            <TklSvg/>
        </div>
        {/* <div className="txt">泰裤辣</div> */}
    </div>)
}

const _css = css`
  color: #ffffff;
  display: flex; 
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  
  & .logoContainer{
    & > svg{
      height: 48px;
      width: auto;
    }
  }
  
  & > div > img {
    height: 40px !important;
  }

  & > .txt {
    font-size: 18px;
    margin-left: 6px;
  }
`;
