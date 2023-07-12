/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const FeatureIcon = ({name, onClick}: any) => {
    return <div css={_css} onClick={onClick}>
        <div>
            {name}
        </div>
    </div>
}

const _css = css`
  //background: #605cf0;
  padding: 6px 10px;
  //color: #ffffff;
  border-radius: 4px;
`
