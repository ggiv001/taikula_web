/** @jsxImportSource @emotion/react */
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {css} from "@emotion/react";

export const PlanItemSkeleton = () => {
    return (<SkeletonTheme baseColor="#ebedf0" highlightColor="#808080" height="20px">
        <div css={_css}>
            <Skeleton count={6}/>
        </div>
    </SkeletonTheme>);
}

const _css = css`
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
`;
