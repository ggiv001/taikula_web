/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Spinner} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";

export const LoadingUi = ({loading}: any) => {
    const ref = useRef<any>();
    const [height, setHeight] = useState<number>(1000);

    useEffect(() => {
        if (ref.current) {
            setHeight(document.body.scrollHeight);
        }
    }, [ref])

    const _css = css`
      position: absolute;
      top: 0;
      left: 0;
      background: #282c34;
      opacity: 0.6;
      z-index: 9999;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: ${height}px;
      overflow: hidden;

      & .loading-box {
        position: absolute;
        top: calc(100vh / 2)
      }
    `

    if (loading) {
        return <div ref={ref} css={_css}>
            <div className={"loading-box"}>
                <Spinner animation="border" variant="primary"/>
            </div>
        </div>
    }
    return <></>
}
