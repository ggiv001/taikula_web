/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FragmentAccount} from "../../components/layouts/fragment-account";
import {Line} from "../../components/line";
import {AccountInfo} from "./component/account-info";
import {Common} from "../../utils/common";
import {useSessionStatus} from "../../hooks/useSessionStatus";
import {PlanItemSkeleton} from "./component/plan-item-skeleton";
import {AccountUtil} from "../../utils/account";
import {Col, Row} from "react-bootstrap";
import {FeatureIcon} from "./component/feature-icon";
import {Router} from "../../utils/router";
import {useNavigate} from "react-router-dom";
import {config} from "../../utils/config";
import {SectionDownload} from "../index/sections/download";


export const AccountIndexPage = () => {
    const {serviceStatus, accountId} = useSessionStatus();
    const push = useNavigate();

    async function onClickLogout() {
        const result = await AccountUtil.sessionDelete();
        if (result) {
            push(Router.LoginPage)
        }
    }

    function onClickSub() {
        push(Router.PlanSelectPage);
    }

    function onClickPartner() {
        push(Router.InvitationPage)
    }

    const UE = () => {
        if (serviceStatus) {
            return <div css={_css}>
                {/* <AccountInfo account_id={accountId} account_status={serviceStatus?.is_active}/>
                <Line/> */}
                <div className={"curPlan"}>
                    <div className={"title"}>您的订阅</div>
                    <div className={"rows"}>
                        <div className={"left"}>订阅类型:</div>
                        <div className={"right"}>{config.planName(serviceStatus?.current_plan)}</div>
                    </div>
                    <div className={"rows"}>
                        <div className={"left"}>到期时间:</div>
                        <div className={"right"}>{Common.unixFormat(serviceStatus?.active_until)}</div>
                    </div>

                    <div className={"rows"}>
                        <div className={"left"}>您的权益:</div>
                        <div className={"right quanyi"}>
                            <ul>
                                {
                                    AccountUtil.parseQuanYi(serviceStatus?.limit)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <Line/>
                <Row>
                    <Col><FeatureIcon name={"捐赠"} onClick={onClickSub}/></Col>
                    <Col><FeatureIcon name={"邀请"} onClick={onClickPartner}/></Col>
                    <Col><FeatureIcon name={"退出"} onClick={onClickLogout}/></Col>
                </Row>
                <Row>
                    <Col>
                        <FeatureIcon name={"网址导航"} onClick={onClickSub}/>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </div>

        } else {
            return <PlanItemSkeleton/>
        }
    }
    return (
        <>
            <FragmentAccount mobile={true}>
                <UE/>
                <div css={_cssDownload}>
                    <SectionDownload/>
                </div>
            </FragmentAccount>
        </>
    );
};

const _cssDownload = css`
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 15px;
`;

const _css = css`
  ${Common.baseFragmentCss()}
  & .curPlan {
    & > .title {
      font-weight: bold;
      font-size: 18px;
    }

    & .rows {
      display: flex;
      flex-direction: row;
      margin: 10px 0;
      align-items: center;

      & .left {
        min-width: 100px;
      }

      & .quanyi {
        ul {
          padding-left: 1rem;
        }
      }

    }
  }

  & .row {
    & .col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

`;
