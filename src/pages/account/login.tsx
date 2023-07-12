/** @jsxImportSource @emotion/react */
import { FragmentAccount } from "../../components/layouts/fragment-account";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { css } from "@emotion/react";
import { SpinnerEx } from "../../components/spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Common } from "../../utils/common";
import { Router } from "../../utils/router";
import { AccountUtil } from "../../utils/account";
import { useEffect, useState } from "react";
import { http } from "../../utils/http";
import { useAlertError } from "../../hooks/useAlertError";
import { cache } from "../../utils/cache";
import { config } from "../../utils/config";
import Modal from "../../components/modal";


export const LoginPage = () => {
    const { showAlert, AlertUi } = useAlertError();
    const [account, setAccount] = useState("");
    const [accountPwd, setAccountPwd] = useState("");
    const [callback, setCallback] = useState("");

    const [loginLoading, setLoginLoading] = useState(false);
    const push = useNavigate();
    const [params] = useSearchParams();
    const createAccountBtn = () => {
        push(Router.PlanPage);
    };

    async function login(event: any) {
        event.preventDefault();
        setLoginLoading(true);
        const { data: res } = await http.newSessionByEmail(account, accountPwd);
        setLoginLoading(false);

        const { token, service_status } = res
        if (service_status) {
            cache.set(config.plan, service_status);
        }
        if (!token) {
            const tipInfo = res.message ?? "账号登录失败,请检查账号是否正确";
            showAlert(tipInfo)
            return
        } else {
            cache.set(config.token, token);
        }
        if (callback) {
            push(callback)
        } else {
            push(Router.AccountPage)
        }
    }

    function accountInputChange(e: any) {
        const _account = e.target.value;
        if (_account) {
            setAccount(_account);
        }
    }

    function accountPwdInputChange(e: any) {
        const _password = e.target.value;
        if (_password) {
            setAccountPwd(_password);
        }
    }

    useEffect(() => {

        const token = AccountUtil.getToken();
        if (token) {
            push(Router.AccountPage);
        }
        if (params) {
            const _token = params.get("token");
            const _callback = params.get("callback")
            if (_token) {
                cache.set(config.token, _token);
            }
            if (_callback) {
                setCallback(_callback)
                _token && push(_callback);
            }
        }
    }, [params]);


    return (
        <>
            <FragmentAccount>
                <div css={_css}>
                    <div className="accountFrm">
                        <div>
                            <AlertUi />
                        </div>
                        <Form onSubmit={login}>
                            <div className="input-feedback">
                                <Form.Control
                                    className="input"
                                    type="email"
                                    name="account"
                                    placeholder="用户邮箱"
                                    required
                                    onChange={accountInputChange}
                                    isInvalid={!!account && !Common.validEmail(account)}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    请输入正确邮箱
                                </Form.Control.Feedback>
                            </div>
                            <Form.Control
                                className="input"
                                type="password"
                                placeholder="用户密码"
                                required
                                onChange={accountPwdInputChange}
                            />
                            <div className="loginContainer">
                                <Button
                                    className="loginButton"
                                    variant="secondary"
                                    size="lg"
                                    type="submit"
                                >
                                    <SpinnerEx loading={loginLoading} />
                                    登录
                                </Button>
                            </div>
                        </Form>
                        <div className="createAccount">
                            <Button
                                onClick={() => { push(Router.RegisterPage) }}
                                className="loginButton"
                                variant="secondary"
                                size="lg"
                            >
                                <SpinnerEx loading={false} />
                                创建账号
                            </Button>
                        </div>
                        <button className="button-link" onClick={() => { push(Router.RegisterPage + '?forget=true') }}>忘记密码 ？</button>
                    </div>
                </div>
            </FragmentAccount>
        </>
    );
};

const _css = css`

  .accountFrm {
    color: #ffffff;
    margin-top: -30px;

    & .loginButton {
      width: 100%;
      padding: 1rem 0 !important;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 0.375rem;
      background-color: #5551ef;
    }

    & .input {
      background: white;
      border-radius: 0.375rem;
    }
    .input-feedback{
        position: relative;
    }

    & .createAccount {
      margin-top: 8px;
    }

    & .loginLabel {
      text-align: center;
    }
  }

  .button-link{
    background: transparent;
    float: right;
    font-family: "Nunito Sans", sans-serif;
    padding: 18px 20px;
    font-size: 14px;
    color: white;
    border: none;
    font-weight: 700;
  }

  @media only screen and (min-width: 992px) {
    .accountFrm {
      color: #ffffff;
      margin-top: -30px;
      width: 50%;
      margin: 0 auto;
    }
  }
`;
