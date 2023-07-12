/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Link, useRouteError} from "react-router-dom";
import {Alert} from "react-bootstrap";

export const ErrorBoundary = () => {
    let error = useRouteError();
    return <>
        {
            error && <div css={_css}>
                <Alert variant="danger" className="error-box">
                    <Alert.Heading>An error occurred</Alert.Heading>
                    <p>
                        {JSON.stringify(error)}
                    </p>
                </Alert>
                <div className="back">
                    <Link to="/">返回</Link>
                </div>
            </div>
        }
    </>;
}

const _css = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  & .error-box {
    width: 96vw;
  }
  & .back{
    
  }
`;
