/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Footer } from "../footer";
import { Header } from "../header";

const pcAdapter = css`
  .container {
    min-height: calc(100vh / 2);
  }

  @media only screen and (min-width: 992px) {
    .container {
      background: #ffffff;
      border-radius: 18px;
      margin-top: -30px;
      width: 50%;
      margin: 0 auto;
      padding: 16px;
    }
  }
`;

export const FragmentAccount = (props: any) => {
  const height = window.innerHeight

  const _css = css`
      ${props.mobile ? pcAdapter : ""}
      .banner_normal{
        min-height: ${height - 80}px;
      }
      @media only screen and (max-width: 992px) {
      .banner_normal{
        min-height: ${height - 120}px;
      }
  }
    `;
  return (
    <>
      <Header />
      <div css={_css}>
        <div className="banner banner_normal" >
          <div className="container">{props.children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};
