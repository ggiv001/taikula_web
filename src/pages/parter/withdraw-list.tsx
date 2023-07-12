/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FragmentAccount} from "../../components/layouts/fragment-account";
import {Common} from "../../utils/common";
import {Badge, Breadcrumb, Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {Line} from "../../components/line";
import {useFetch} from "../../hooks/useFetch";
import {http} from "../../utils/http";
import Modal from "../../components/modal";
import {useState} from "react";
import {SpinnerEx} from "../../components/spinner";
import {Link} from "react-router-dom";
import {Router} from "../../utils/router";

enum TradeRecordStatus {
    提现中 = "0",
    交易成功 = "1",
    交易失败 = "2",
}

function getTradeRecordStatusName(value: string) {
    switch (value) {
        case "0":
            return <>
                <Badge bg="secondary">提现中</Badge>
                <span> (T+1到账) </span>
            </>
            break;
        case "1":
            return <Badge bg="primary">交易成功</Badge>
            break;
        case "2":
            return <Badge bg="danger">交易失败</Badge>
            break;
    }
}

export const WithdrawListPage = () => {
    const {data: mineData} = useFetch(http.getMineData);
    const {data: withdrawRecord} = useFetch(http.getWallectRecord, "2")

    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        address: '',
        password: '',
    });

    const onChange = (e: any) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    function btnShowApply() {
        setShow(true)
    }

    function handleCancel() {
        setShow(false)
    }

    async function handleSubmit(event: any) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        const amount = mineData?.balance;
        let _data: any
        try {
            _data = await http.withdrawApply(formValue.address, formValue.password, amount)
        } catch (e) {
            console.log("e", e)
        }
        const {code, msg, status, message} = _data;
        if (code === 200) {
            Modal.info("提交成功", null, {confirmTitle: ""});
            setShow(false);
            setFormValue({
                address: '',
                password: ''
            })
        } else {
            if (msg) {
                Modal.info("申请失败:" + msg, null, {confirmTitle: ""});
            } else if (message) {
                Modal.info("申请失败:" + message, null, {confirmTitle: ""});
            } else {
                Modal.info("申请失败", null, {confirmTitle: ""});
            }
        }
    }

    return <>
        <FragmentAccount mobile={true}>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        <Link to={Router.AccountPage}>用户中心</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <Link to={Router.PartnerPage}>合伙人</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        提现管理
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div css={_applyCss}>
                <Row>
                    <Col>总收入 : </Col>
                    <Col>{mineData?.total_reward} {mineData?.assetsType}</Col>
                </Row>
                {mineData?.total_reward > 0 &&
                    <Row>
                        <Col></Col>
                        <Col>≈ ¥ {mineData?.total_reward2}</Col>
                    </Row>
                }
                <Row>
                    <Col>已提现 : </Col>
                    <Col>{mineData?.balance} {mineData?.assetsType}</Col>
                </Row>
                <Row>
                    <Col>可提现 : </Col>
                    <Col>{mineData?.withdraw_amount} {mineData?.assetsType}</Col>
                </Row>
                {
                    show && <>
                        <Row>
                            <Col className="form-box">
                                <Form validated={validated}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>提现地址</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control inputMode="text" required value={formValue.address} name="address"
                                                          type="address"
                                                          placeholder="输入TRC20的USDT收款地址" onChange={onChange}/>
                                            <Form.Control.Feedback type="invalid">
                                                请输入TRC20的USDT收款地址
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <Form.Text className="text-muted">
                                            请输入真实的TRC20的USDT收款地址
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>提现密码</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control required value={formValue.password} name="password"
                                                          type="password"
                                                          placeholder="输入提现密码" onChange={onChange}/>
                                            <Form.Control.Feedback type="invalid">
                                                请输入正确的提现密码
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <Form.Text className="text-muted">
                                            请输入正确的提现密码
                                        </Form.Text>
                                    </Form.Group>
                                </Form>

                                <div className={"btnGroup"}>
                                    <Button variant="primary" className={"cancel"} onClick={handleCancel}>
                                        关闭
                                    </Button>
                                    <Button /* disabled={loading} */ variant="primary" className={"apply"}
                                                                     onClick={handleSubmit}>
                                        <SpinnerEx  /* loading={loading} */ />
                                        确定申请
                                    </Button>
                                </div>

                            </Col>
                        </Row>
                    </>
                }

                {
                    !show && <Row>
                        <Col className="withdraw-box">
                            <div className="withdraw-apply" onClick={btnShowApply}>发起提现申请</div>
                        </Col>
                    </Row>
                }

            </div>
            <div css={_css}>
                {
                    withdrawRecord && withdrawRecord.map((item: any, i: number) => {
                        return <div key={i}>
                            <Row>
                                <Col>交易类型: 提现 </Col>
                                <Col>金额: {item.amount} {item.assetsType}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    提现地址: {item.toAddress}
                                </Col>
                            </Row>
                            <Row>
                                <Col> 状态: {getTradeRecordStatusName(item.status)}
                                </Col>
                            </Row>
                            <Row>
                                <Col>时间: {Common.dateFormat(item.createTime)}</Col>
                            </Row>

                            <Line/>
                        </div>
                    })
                }
            </div>
        </FragmentAccount>
    </>
}

const _css = css`
  ${Common.baseFragmentCss()}
  margin-top: 15px;
  
  & .row {
    margin: 4px 0;
  }

  & .badge {
    padding: 0.5em 0.8em;
  }

`

const _applyCss = css`
  ${Common.baseFragmentCss()}
  margin-bottom: 8px;

  & .withdraw-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  & .withdraw-apply {
    background: #605cf0;
    color: white;
    padding: 5px;
    width: 50%;
    text-align: center;
    margin-top: 6px;
    border-radius: 5px;
  }

  & .form-box {
    border: solid 1px #eeeeee;
    margin: 8px;
    padding: 8px;
  }

  & .btnGroup {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

`
