/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FragmentAccount} from "../../components/layouts/fragment-account";
import {Common} from "../../utils/common";
import {useSessionStatus} from "../../hooks/useSessionStatus";
import {AlertEx} from "../../components/alert";
import {Accordion, Alert, Breadcrumb, Button, Col, Row} from "react-bootstrap";
import {Router} from "../../utils/router";
import {Link, useNavigate} from "react-router-dom";
import {QRCodeSVG} from 'qrcode.react';
import {CopyEx} from "../../components/copyex";
import {config} from "../../utils/config";
import {useFetch} from "../../hooks/useFetch";
import {http} from "../../utils/http";
import {AgentStatus} from "../../utils/model";

export const PartnerPage = () => {
    const {serviceStatus} = useSessionStatus();
    const {data: mineData} = useFetch(http.getMineData);
    const {data: agentTeamData} = useFetch(http.getAgentTeamData);
    const push = useNavigate();

    const NotApplyUi = ({status}: any) => {
        const tipsNotApply = "您还没有申请成为合伙人";
        const tipsWaitApply = "您的申请已经提交,请等待客服审核"
        const tipsApplied = "恭喜您,已经成为泰裤辣的合伙人,开始邀请用户一起来赚钱吧"
        const alertCss = css`
          & .applyBtn {
            width: 100%;
            border-radius: 6px;
          }
        `
        const Body = () => {
            if (status === "1") {
                return <>{tipsWaitApply}</>;
            } else if (status === "2") {
                return <>{tipsApplied}</>
            } else {
                return <>{tipsNotApply}</>
            }
        }

        const getVariant = () => {
            if (status === "1") {
                return "warning";
            } else if (status === "2") {
                return "success";
            } else {
                return "danger";
            }
        }

        return <div css={alertCss}>
            <AlertEx variant={getVariant()} canClose={false} message={<Body/>}/>
            {
                status !== "2" && <Button onClick={() => push(Router.PartnerApplyPage)} variant="danger"
                                          className={"applyBtn"}>申请成为合伙人</Button>
            }
        </div>
    }
    const genShareLink = () => {
        if (serviceStatus?.share_code) {
            return config.domain + "/i/" + serviceStatus?.share_code;
        }
        return "";
    }
    const teamTotalDeposit = parseFloat(agentTeamData?.sub_total_amount) + parseFloat(agentTeamData?.self_amount);

    function onClickWithdraw() {
        push(Router.WithdrawPage)
    }

    function getTelegram(json: string | undefined) {
        if (json) {
            try {
                const data = JSON.parse(json);
                const {telegram, cloudchat} = data;
                if (telegram) {
                    return telegram;
                }
                if (cloudchat) {
                    return cloudchat;
                }
            }catch (e) {
                return ""
            }
        }
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
                            合伙人
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <NotApplyUi status={serviceStatus?.agent_status}/>
                </div>
                <div>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>邀请信息</Accordion.Header>
                            <Accordion.Body>
                                <div className={"qrcode"}>
                                    {
                                        genShareLink() && <QRCodeSVG value={genShareLink()}/>
                                    }
                                </div>
                                <div className={"shareCodeLink"}>
                                    <div>
                                        {genShareLink()}
                                    </div>
                                    <div>
                                        <CopyEx content={genShareLink()}/>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item
                            eventKey="1" /*  style={{ display: serviceStatus?.agent_status === '2'? 'block':'none' }} */>
                            <Accordion.Header>返佣信息</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col>我的返佣比例:</Col>
                                    <Col>{serviceStatus?.agent_status === '2' ? serviceStatus?.rate + "%" : "无"}</Col>
                                </Row>
                                <Row>
                                    <Col>我的上级:</Col>
                                    <Col>{getTelegram(serviceStatus?.parent) || '无'}</Col>
                                </Row>

                                <hr className="lineSp"/>

                                <Row>
                                    <Col>总收入:</Col>
                                    <Col>{mineData?.total_reward} {mineData?.assetsType}</Col>
                                </Row>
                                {mineData?.total_reward > 0 &&
                                    <Row>
                                        <Col></Col>
                                        <Col>≈ ¥ {mineData?.total_reward2}</Col>
                                    </Row>
                                }
                                <hr className="lineSp"/>
                                <Row>
                                    <Col>可提现余额:</Col>
                                    <Col>
                                        {mineData?.balance} {mineData?.assetsType}

                                        <div className="withdraw-list" onClick={onClickWithdraw}>申请提现</div>
                                    </Col>
                                </Row>
                                {mineData?.balance > 0 &&
                                    <Row>
                                        <Col></Col>
                                        <Col>≈ ¥ {mineData?.balance2}</Col>
                                    </Row>
                                }
                                <hr className="lineSp"/>
                                <Row>
                                    <Col>已提现金额:</Col>
                                    <Col>{mineData?.withdraw_amount} {mineData?.assetsType}</Col>
                                </Row>
                                {mineData?.withdraw_amount > 0 &&
                                    <Row>
                                        <Col></Col>
                                        <Col>≈ ¥ {mineData?.withdraw_amount2}</Col>
                                    </Row>
                                }

                            </Accordion.Body>
                        </Accordion.Item>
                        {
                            serviceStatus?.agent_status === AgentStatus.Applyed && <Accordion.Item eventKey="2">
                                <Accordion.Header>我的下级</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <Row>
                                            <Col>邀请总人数:</Col>
                                            <Col>{agentTeamData?.person_num}</Col>
                                        </Row>
                                        <Row>
                                            <Col>邀请有效人数:</Col>
                                            <Col>{agentTeamData?.person_num_payed}</Col>
                                        </Row>
                                        <Row>
                                            <Col>邀请总充值:</Col>
                                            <Col>{teamTotalDeposit} USD</Col>
                                        </Row>
                                        {teamTotalDeposit > 0 &&
                                            <Row>
                                                <Col></Col>
                                                <Col>≈
                                                    ¥ {parseFloat(agentTeamData?.sub_total_amount2) + parseFloat(agentTeamData?.self_amount2)}</Col>
                                            </Row>
                                        }
                                    </div>
                                    <div className={"sublist"}>
                                        <Alert key="" variant="primary" onClick={() => push(Router.PartnerSubListPage)}>
                                            查看下级列表
                                        </Alert>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        }
                    </Accordion>
                </div>
            </div>
        </FragmentAccount>
    </>
}

const _css = css`
  ${Common.baseFragmentCss()}
  & .qrcode {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  & .shareCodeLink {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & .sublist {
    margin-top: 20px;
    cursor: pointer;
  }

  & .lineSp {
    height: 2px;
    border: none;
    border-top: 2px dotted #185598;
    width: 100%;
  }

  & .withdraw-list {
    margin-top: 10px;
    background: #5551ef;
    color: white;
    text-align: center;
    border-radius: 5px;
    padding: 3px 0;
  }

`
