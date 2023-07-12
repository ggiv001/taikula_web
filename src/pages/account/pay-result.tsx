/** @jsxImportSource @emotion/react */
import {FragmentAccount} from "../../components/layouts/fragment-account";
import {Error, Success, Wait} from "../../images";
import {css} from "@emotion/react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {http} from "../../utils/http";
import {PlanItemSkeleton} from "./component/plan-item-skeleton";
import {Button} from "react-bootstrap";
import {Router} from "../../utils/router";

interface OrderResult {
    orderId: any,
    subType: string,
    subPeriod: any,
    amount: any,
    amountUnit: any,
    payAmount: any,
    payAmountRmb: any,
    status: any
}

export const PayResultPage = () => {
    const [order, setOrder] = useState<OrderResult>();
    const [params] = useSearchParams();
    const orderId = params.get("oid");
    const status = params.get("status");
    const push = useNavigate();

    async function getOrderInfo(orderId: any) {
        const orderResult = await http.getSubByOid(orderId)
        const {data} = orderResult;
        const {product, vpn_sub_record} = data;
        const statusTmp = status || vpn_sub_record.status;
        if (product && vpn_sub_record) {
            setOrder({
                orderId: vpn_sub_record.orderId,
                subType: product.name,
                subPeriod: vpn_sub_record.period,
                amount: vpn_sub_record.amount,
                status: statusTmp,
                payAmount: vpn_sub_record.payAmount,
                payAmountRmb: vpn_sub_record.payAmountRmb,
                amountUnit: vpn_sub_record.unit,
            })
        }
        if(statusTmp === "0"){
            console.log("111")
            setTimeout(() => {
                getOrderInfo(orderId);
            }, 5000);
        }
    }

    useEffect(() => {
        if (orderId) {
            getOrderInfo(orderId)
        }
    }, [orderId])

    const convertIcon = () => {
        if (order) {
            if (order.status === "0") {
                return <Wait/>
            } else if (order.status === "1") {
                return <Success/>
            } else if (order.status === "2") {
                return <Error/>
            } else {
                return <Error/>
            }
        }
        return <></>
    }

    const convertStatusText = () => {
        if (order) {
            if (order.status === "0") {
                return "等待支付"
            } else if (order.status === "1") {
                return "支付成功"
            } else if (order.status === "2") {
                return "支付失败"
            } else if (order.status === "3") {
                return "超时取消"
            } else {
                return "未知结果"
            }
        }
        return <></>
    }

    const onClickNavigateTo = () => {
        push(Router.AccountPage)
    }

    const UE = () => {
        if (order) {
            return <div css={_css}>
                <div className="status-info">
                    <div className="status-icon">
                        {convertIcon()}
                    </div>
                    <div className="status-txt">
                        {convertStatusText()}
                    </div>
                    <div className="status-message">
                        <div className="line">
                            <div className="left">订阅订单:</div>
                            <div className="right">{order.orderId}</div>
                        </div>
                        <div className="line">
                            <div className="left">订阅类型:</div>
                            <div className="right">{order.subType}</div>
                        </div>
                        <div className="line">
                            <div className="left">订阅周期:</div>
                            <div className="right">{order.subPeriod}天</div>
                        </div>
                        <div className="line">
                            <div className="left">支付金额:</div>
                            <div className="right">{order.amountUnit === 'cny' ? order.payAmountRmb : order.payAmount} {order.amountUnit}</div>
                        </div>
                    </div>
                    <div className="navi">
                        <Button variant="secondary" onClick={onClickNavigateTo}>用户中心</Button>
                    </div>
                </div>
            </div>
        } else {
            return <PlanItemSkeleton/>
        }
    }

    return <>
        <FragmentAccount mobile={true}>
            <UE/>
        </FragmentAccount>
    </>
}


const _css = css`
  color: #000000;
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  .status-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .status-icon {
      svg {
        width: 70px;
        height: 70px;
      }
    }

    .status-txt {
      font-size: 22px;
      margin-top: 10px;
    }

    .status-message {
      margin-top: 10px;

      .line {
        display: flex;
        flex-direction: row;
        margin: 8px 0;

        & .left {
          min-width: 80px;
        }

        & .right {
          margin-left: 5px;
        }
      }
    }

    .navi {
      width: 100%;
      margin-top: 10px;

      button {
        width: 100%;
        border-radius: 8px;
      }
    }

  }
`
