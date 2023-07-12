/** @jsxImportSource @emotion/react */
import { FragmentAccount } from "../../components/layouts/fragment-account";
import { css } from "@emotion/react";
import { SpinnerEx } from "../../components/spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Router } from "../../utils/router";
import { AccountUtil } from "../../utils/account";
import { useEffect, useState } from "react";
import { useAlertError } from "../../hooks/useAlertError";
import { config } from "../../utils/config";
import { cache } from "../../utils/cache";
import { RegistrationBox } from "./component/registration-box";

export const RegisterPage = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const push = useNavigate();
    const [params] = useSearchParams();
    const [forget, setForget] = useState(false)

    useEffect(() => {

        const token = AccountUtil.getToken();
        if (token) {
            push(Router.AccountPage);
        }
        if (params) {
            const _forget = params.get("forget");
            setForget(!!_forget)
        }
    }, [params]);


    return (
        <>
            <FragmentAccount>
                <div css={_css}>
                    <div className="registerFrm">
                        <RegistrationBox forget={forget} />
                        <div className="back-box">
                            <button
                                className="back-button"
                                onClick={() => { window.history.back() }}
                            >
                                <SpinnerEx loading={loginLoading} />
                                &lt;&lt; 已有账号去登录
                            </button>
                        </div>
                    </div>
                </div>
            </FragmentAccount>
        </>
    );
};

const _css = css`
   .back-box{
        width: 100%;
        overflow: hidden;
    }
  .back-button{
    background: transparent;
    float: right;
    font-family: "Nunito Sans", sans-serif;
    padding: 18px 20px;
    font-size: 14px;
    color: white;
    border: none;
    font-weight: 700;
  }

  .hint{
    font-size: 14px;
  }

  @media only screen and (min-width: 992px) {
    .back-box{
        width: 50%;
        margin: 0 auto;
    }
    .accountFrm {
      color: #ffffff;
      margin-top: -30px;
      width: 50%;
      margin: 0 auto;
    }
  }
`;
