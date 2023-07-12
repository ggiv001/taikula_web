/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FragmentAccount} from "../../components/layouts/fragment-account";
import {Common} from "../../utils/common";
import {Breadcrumb, Button, Card, Col, Form, InputGroup, Modal, Row, Tab, Tabs} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {Router} from "../../utils/router";
import {useFetch} from "../../hooks/useFetch";
import {http} from "../../utils/http";
import {AgentStatus} from "../../utils/model";
import {useState} from "react";
import {useIMask} from "react-imask";
import {useToggle} from "../../hooks/useToggle";
import {Line} from "../../components/line";
import _Modal from "../../components/modal";

export const PartnerSubListPage = () => {
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
                            下级列表
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <Tabs
                        defaultActiveKey="applyed-list"
                        id="apply-wait-list"
                        className="mb-3"
                    >
                        <Tab eventKey="applyed-list" title="通过列表">
                            {
                                WaitApplyList(AgentStatus.Applyed)
                            }
                        </Tab>
                        <Tab eventKey="wait-apply-list" title="待审核列表">
                            {
                                WaitApplyList(AgentStatus.Apply)
                            }
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </FragmentAccount>
    </>
}

const WaitApplyList = (status: AgentStatus) => {
    const {data: waitApplyList, refresh} = useFetch(http.getAgentSubList, status);
    const {status: show, toggle: toggleShow} = useToggle(false);
    const [itemData, setItemData] = useState<any>();

    function ConvertContract(contract: string) {
        if (contract) {
            const _contract = Common.parseJson(contract);
            if (_contract) {
                const {telegram, cloudchat} = _contract;
                return <div>
                    <div>tg: {telegram}</div>
                    <div>cc: {cloudchat}</div>
                </div>
            }
        }
        return <></>
    }

    function btnClickAudit(_item: any) {
        setItemData(_item);
        toggleShow();
    }

    async function handleConfirm(data: any) {
        if (data) {
            const result: any = await http.partnerAudit(data.id, data.rate, data.status);
            const {data: responseBody} = result;
            const {code: _code, data: _data} = responseBody;

            if (_code === 200) {
                toggleShow();
                _Modal.info("审核成功", () => {
                    window.location.reload();
                }, {
                    confirmTitle: ""
                });
            } else {
                toggleShow();
                _Modal.info("审核失败", null, {
                    confirmTitle: ""
                });
            }
            // if (_code === 500) {
            //     toggleShow();
            //     _Modal.info("审核失败", null, {
            //         confirmTitle: ""
            //     });
            // } else if (_code === 200) {
            //     toggleShow();
            //     _Modal.info("审核成功", () => {
            //         window.location.reload();
            //     }, {
            //         confirmText: ""
            //     });
            // }
        }
    }

    const AuditUi = ({item, show, handleClose, handleConfirm}: any) => {

        const [opts, setOpts] = useState({mask: Number, min: 1, max: 100});
        const {
            ref,
        } = useIMask(opts);

        const [formValue, setFormValue] = useState({
            rate: '',
            status: '2'
        });

        const onChange = (e: any) => {
            setFormValue({...formValue, [e.target.name]: e.target.value});
        };

        function onHandleConfirm() {
            handleConfirm({
                ...item,
                ...formValue
            });
        }

        return <>
            <Modal animation={false}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   show={show}
                   onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>合伙人审核</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        item && <>
                            <Row>
                                <Col>邮箱:</Col>
                                <Col>{item.email}</Col>
                            </Row>
                            <Line/>
                            <div className="audit-form">
                                <Form.Group className="mb-3" controlId="rate">
                                    <Form.Label>返佣比例</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control ref={ref} inputMode="text" required name="rate"
                                                      type="number"
                                                      placeholder="输入返佣比例" onChange={onChange}/>
                                        <Form.Control.Feedback type="invalid">
                                            请输入正确的返佣比例
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <Form.Text className="text-muted">
                                        请输入返佣比例 1-100 之间的整数,而且必须是5的位数
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>结果</Form.Label>
                                    <div className="mb-3">
                                        <Form.Check
                                            inline
                                            label="通过"
                                            name="status"
                                            type="radio"
                                            value="2"
                                            checked={formValue.status === "2"}
                                            onChange={onChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="拒绝"
                                            name="status"
                                            type="radio"
                                            value="3"
                                            checked={formValue.status === "3"}
                                            onChange={onChange}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={onHandleConfirm}>
                        确定
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    }

    const [opts, setOpts] = useState({mask: Number, min: 1, max: 100});
    const {
        ref: refUpdateRate,
        maskRef,
        value,
        setValue,
        unmaskedValue,
        setUnmaskedValue,
        typedValue,
        setTypedValue,
    } = useIMask(opts);

    const [newRate, setNewRate] = useState(0);

    const [rateUid, setRateUid] = useState("");

    async function btnUpdateRate(uid: string) {
        const result = await http.updateRate(uid, newRate);
        const {data} = result;
        const {code, msg} = data;
        if (code === 200) {
            _Modal.warn("调整成功!")
            setRateUid("");
            refresh();
        } else {
            _Modal.warn("调整失败:" + msg)
        }
    }

    function onRateChange(e: any) {
        try {
            setNewRate(parseInt(e.target.value));
        } catch (e) {
        }
    }

    function btnShowUpdateRate(uid: string) {
        setRateUid(uid);
    }

    function btnCancleUpdateRate(uid: string) {
        setRateUid("");
    }

    return <>
        <AuditUi item={itemData} show={show} handleClose={toggleShow} handleConfirm={handleConfirm}/>
        {
            waitApplyList && waitApplyList.map((item: any, i: number) => {
                return <>
                    <div key={i}>
                        <Card className="section-card">
                            <Card.Header as="h5">{item.email}</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>联系方式:</Col>
                                    <Col>
                                        {ConvertContract(item.contact)}
                                    </Col>
                                </Row>
                                {
                                    status === AgentStatus.Applyed && <>
                                        <Row>
                                            <Col>返佣比例:</Col>
                                            <Col>
                                                <span> {item.rate}% </span> <span
                                                onClick={() => btnShowUpdateRate(item.id)}>(修改)</span>
                                            </Col>
                                        </Row>
                                        {
                                            rateUid === item.id && <>
                                                <Row>
                                                    <Col>
                                                        <div className="update-rate-form">
                                                            <div>
                                                                <Form.Group className="mb-3" controlId="rate">
                                                                    <InputGroup hasValidation>
                                                                        <Form.Control ref={refUpdateRate} inputMode="text" required
                                                                                      name="rate"
                                                                                      type="number"
                                                                                      placeholder="输入返佣比例" onChange={onRateChange}/>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            请输入正确的返佣比例
                                                                        </Form.Control.Feedback>
                                                                    </InputGroup>
                                                                    <Form.Text className="text-muted">
                                                                        请输入返佣比例 1-100 之间的整数,而且必须是5的位数,调整比例只能升不能降.
                                                                    </Form.Text>
                                                                </Form.Group>
                                                            </div>
                                                            <div className="button-group">
                                                                <div className="button" onClick={() => btnCancleUpdateRate(item.id)}>取消</div>
                                                                <div className="button" onClick={() => btnUpdateRate(item.id)}>确定</div>
                                                            </div>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        <Row>
                                            <Col>返佣金额</Col>
                                            <Col>{Common.formatToInt(item.totalReward)} USD</Col>
                                        </Row>
                                    </>
                                }
                                <Row>
                                    <Col>账号到期:</Col>
                                    <Col>{Common.unixFormat(item.activeUntil)}</Col>
                                </Row>
                                {
                                    status === AgentStatus.Apply && <>
                                        <Row>
                                            <Col>
                                                <Button size="sm" className="audit-button" onClick={() => btnClickAudit(item)}>
                                                    审 核
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </>
            })
        }
    </>
}


const _css = css`
  ${Common.baseFragmentCss()}
  & .section-card {
    margin-bottom: 8px;
  }

  & .audit-button {
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
  }

  & .update-rate-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;
    border: dotted 1px #e9ecef;
    padding: 5px;

    & .form-control {
      margin-bottom: 2px;
    }
    
    & .button-group{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    & .button {
      background: #35363a;
      padding: 5px 30px;
      color: white;
      border-radius: 6px;
    }

  }

`
