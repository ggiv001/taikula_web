/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FragmentAccount} from "../../components/layouts/fragment-account";
import {Common} from "../../utils/common";
import {Alert, Breadcrumb, Button, Form, InputGroup} from "react-bootstrap";
import {useState} from "react";
import {useAlertError} from "../../hooks/useAlertError";
import {http} from "../../utils/http";
import Modal from "../../components/modal"
import {Link, useNavigate} from "react-router-dom";
import {Router} from "../../utils/router";
import {SpinnerEx} from "../../components/spinner";
import {useToggle} from "../../hooks/useToggle";
import {cache} from "../../utils/cache";

export const PartnerApplyPage = () => {
    const push = useNavigate();
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        telegram: '',
        cloudchat: '',
    });
    const {showAlert, AlertUi} = useAlertError();
    const {toggle, status: loading} = useToggle();

    const onChange = (e: any) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    const pushToPartnerIndex = () => push(Router.PartnerPage)

    const handleSubmit = async (event: any) => {
        toggle();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            // toggle();

        }
        setValidated(true);

        // check邮件地址
        if (!Common.validEmail(formValue.email)) {
            // showAlert("请输入正确的邮箱");
            Modal.warn("请输入正确的邮箱", () => {
            });
            toggle();
            return;
        }
        if (!Common.validPassword(formValue.password)) {
            //  showAlert("密码不能为空,且必须大于6位");
            Modal.warn("密码不能为空,且必须大于6位", () => {
            });
            toggle();
            return;
        }

        if (!formValue.telegram && !formValue.cloudchat) {
            // showAlert("请至少填写一个联系方式:telegram/cloudchat");
            Modal.warn("请至少填写一个联系方式:telegram/cloudchat", () => {
            });
            toggle();
            return;
        }
        try {
            const result = await http.partnerApply(formValue.email, formValue.password, formValue.telegram, formValue.cloudchat);
            console.log(result);
            toggle();
            const {data} = result;
            const {code, msg} = data;
            if (code === 200) {
                Modal.info("申请已提交,请等待审核", () => {
                    pushToPartnerIndex()
                }, {
                    onConfirm: () => {
                        pushToPartnerIndex()
                    }
                });
            } else if (code === 500) {
                Modal.info(msg, () => {
                    pushToPartnerIndex()
                }, {
                    onConfirm: () => {
                        pushToPartnerIndex()
                    }
                });
            }
        } catch (e) {
            toggle();
        }

    };

    async function handleCancel() {
        // Modal.info("申请已提交,请等待审核");
        window.location.href = "/account";
    }

    return <>
        <FragmentAccount mobile={true}>
            <div css={_css}>
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item active>
                            <Link to={Router.AccountPage}>用户中心</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            <Link to={Router.PartnerPage}>合伙人</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            申请成为合伙人
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <Alert variant="success">
                        <Alert.Heading>申请成为合伙人</Alert.Heading>
                        <p>
                            邀请好友注册泰裤辣，每笔充值均可获得返佣.
                        </p>
                        <p>
                            可设置自己下级的分佣比例
                        </p>
                    </Alert>
                </div>
                <div>
                    <AlertUi/>
                </div>
                <Form validated={validated}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>电子邮件</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control inputMode="email" required value={formValue.email} name="email" type="email"
                                          placeholder="输入电子邮件" onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">
                                请输入正确的电子邮件
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            请输入真实的邮件地址,忘记密码时可使用邮件找回
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>提现密码</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required value={formValue.password} name="password" type="password"
                                          placeholder="输入提现密码" onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">
                                提现密码需大于6位
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            提现密码需大于6位
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telegram">
                        <Form.Label>telegram</Form.Label>
                        <InputGroup>
                            <Form.Control inputMode="text" value={formValue.telegram} name="telegram"
                                          type="text"
                                          placeholder="输入telegram" onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">
                                请输入您的telegram
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            请输入您的telegram,客服会联系您开通合伙人事宜
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cloudchat">
                        <Form.Label>cloudchat</Form.Label>
                        <InputGroup>
                            <Form.Control inputMode="text" value={formValue.cloudchat} name="cloudchat"
                                          type="text"
                                          placeholder="输入cloudchat" onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">
                                请输入您的cloudchat
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            请输入您的cloudchat,客服会联系您开通合伙人事宜
                        </Form.Text>
                    </Form.Group>
                    <div className={"btnGroup"}>
                        <Button variant="primary" className={"cancel"} onClick={handleCancel}>
                            返回
                        </Button>
                        <Button /* disabled={loading} */ variant="primary" className={"apply"} onClick={handleSubmit}>
                            <SpinnerEx  /* loading={loading} */ />
                            确定申请
                        </Button>
                    </div>
                </Form>
            </div>
        </FragmentAccount>
    </>
}

const _css = css`
  ${Common.baseFragmentCss()}
  & .btnGroup {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    & .cancel {
      background: #6c757d;
      border-radius: 5px;
    }

    & .apply {
      background: #0e6dfd;
      border-radius: 5px;
    }
  }
`
