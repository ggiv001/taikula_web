/** @jsxImportSource @emotion/react */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import { css } from "@emotion/react";
import { SpinnerEx } from "../../../components/spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Common } from "../../../utils/common";
import { Router } from "../../../utils/router";
import { AccountUtil } from "../../../utils/account";
import { useEffect, useState } from "react";
import { useAlertError } from "../../../hooks/useAlertError";
import { http } from "../../../utils/http";
import { config } from "../../../utils/config";
import { cache } from "../../../utils/cache";
import Modal from "../../../components/modal";

export const RegistrationBox = ({ forget }: any) => {
    const shareCode = cache.get(config.shareCode);
    const [accountForm, setAccountForm] = useState({
        share_code: shareCode || '',
        user_name: '',
        captcha: '',
        passwd: '',
        re_passwd: '',
    });
    const [name, setName] = useState('')
    const [codeStatus, setCodeStatus] = useState(false)
    const [codeTime, setCodeTime] = useState(0)
    const [loginLoading, setLoginLoading] = useState(false);
    const push = useNavigate();

    async function register(event:any) {
        event.preventDefault();
        const { data: res } = await http.newAccountByEmail(accountForm.share_code, accountForm.user_name, accountForm.captcha, accountForm.passwd, accountForm.re_passwd);

        const { token, service_status } = res;
        if (service_status) {
            cache.set(config.plan, service_status);
        }
        if (token) {
            cache.set(config.token, token);
            push(Router.AccountPage)
        }
    }

    async function finishForget() {
    }

    const onChange = (e: any) => {
        setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
    };

    async function getCode(e: any) {
        setCodeStatus(true)
        const url = forget ? http.captchaEmailToFind : http.captchaEmail
        const { data: res } = await url(accountForm.user_name)

        if (res.code !== 200) {
            setCodeStatus(false)
            Modal.message(res.msg, 'danger');
            return
        }

        let code_time = 60;
        let interval = setInterval(() => {
            setCodeTime(code_time)
            --code_time
            if (code_time < 0) {
                setCodeStatus(false)
                clearInterval(interval);
            }
        }, 1000);
    }

    return (
        <div css={_css}>
            <div className="accountFrm">
                <Form onSubmit={register}>
                    <div className="input-feedback">
                        <Form.Control
                            className="input"
                            type="email"
                            name="user_name"
                            placeholder="用户邮箱"
                            onChange={onChange}
                            required
                            isInvalid={!!accountForm.user_name && !Common.validEmail(accountForm.user_name)}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            请输入正确邮箱
                        </Form.Control.Feedback>
                    </div>
                    <InputGroup className="input">
                        <Form.Control
                            className="input"
                            name="captcha"
                            placeholder="验证码"
                            onChange={onChange}
                            required
                            aria-describedby="basic-addon"
                        />
                        <Button variant="outline-secondary" id="button-addon" disabled={codeStatus || (!accountForm.user_name || !Common.validEmail(accountForm.user_name))} onClick={getCode}>
                            {codeTime > 0 ? `${codeTime} s` : '获取验证码'}
                        </Button>
                    </InputGroup>
                    <div className="input-feedback">
                        <Form.Control
                            className="input"
                            type="password"
                            name="passwd"
                            placeholder="设置用户密码"
                            onChange={onChange}
                            required
                            isInvalid={!!accountForm.passwd && !Common.validPassword(accountForm.passwd)}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            密码为6-10位
                        </Form.Control.Feedback>
                    </div>
                    <div className="input-feedback">
                        <Form.Control
                            className="input"
                            type="password"
                            name="re_passwd"
                            placeholder="再次输入密码"
                            onChange={onChange}
                            required
                            isInvalid={!!accountForm.re_passwd && accountForm.passwd !== accountForm.re_passwd}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            两次密码不一致
                        </Form.Control.Feedback>
                    </div>
                    <Form.Control
                        style={{ display: forget ? 'none' : 'block' }}
                        className="input"
                        readOnly={!!shareCode}
                        name="share_code"
                        defaultValue={accountForm.share_code}
                        placeholder="邀请码"
                        onChange={onChange}
                    />

                    <div className="register-container">
                        <div className="hint">* 若长时间未收到验证码可尝试在邮箱垃圾箱内寻找</div>
                        {!forget ?
                            (<Button
                                className="loginButton"
                                variant="secondary"
                                type="submit"
                                size="lg"
                            >
                                <SpinnerEx loading={loginLoading} />
                                注册
                            </Button>) :
                            (<Button
                                className="loginButton"
                                variant="secondary"
                                size="lg"
                                type="submit"
                            >
                                <SpinnerEx loading={loginLoading} />
                                完成
                            </Button>)}
                    </div>
                </Form>
            </div>
        </div >
    );
};

const _css = css`

  .accountFrm {
    color: #ffffff;

    & .loginButton {
      width: 100%;
      padding: 1rem 0 !important;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 0.375rem;
      margin-top:10px;
      background-color: #5551ef;
    }

    & .input {
      background: white;
      border-radius: 0.375rem;
      overflow: hidden;
        .btn{
        border-radius:0;
        } 
    }
    .input-group{
        margin-bottom:20px;
    }
    .input-feedback{
        position: relative;
        .form-control{
            margin-bottom:20px;
        }
    }

    & .createAccount {
      margin-top: 8px;
    }

    & .loginLabel {
      text-align: center;
    }

    #button-addon{
        background-color: #5551ef;
        color:#fff;
        width: 10rem;
    }
  }

  .backButton{
    float: right;
    background: transparent;
  }

  .hint{
    font-size: 14px;
  }

  @media only screen and (min-width: 992px) {
  }
`;
