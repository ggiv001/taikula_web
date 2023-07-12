/** @jsxImportSource @emotion/react */
import { FragmentAccount } from "../../components/layouts/fragment-account";
import Button from "react-bootstrap/Button";
import { css } from "@emotion/react";
import { Line } from "../../components/line";
import { SelectEx, SelectListProps } from "../../components/select";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AccountInfo } from "./component/account-info";
import { useEffect, useState } from "react";
import { AccountUtil } from "../../utils/account";
import { Router } from "../../utils/router";
import { Location } from "@remix-run/router";
import { ProductType } from "../../utils/model";
import { http } from "../../utils/http";
import { PlanItemSkeleton } from "./component/plan-item-skeleton";
import { config } from "../../utils/config";
import Modal from "../../components/modal";
import { Alert, Breadcrumb } from "react-bootstrap";
import { Common } from "../../utils/common";

export const PlanSelectPage = () => {
    const defaultDays = 720;
    const push = useNavigate();
    const location = useLocation();
    const [accountInfo, setAccountInfo] = useState({});
    const [periodItem, setPeriodItem] = useState({
        days: null,
        id: null,
        originalPrice: null,
        price: null,
        price2: null,
        priceCad: null
    });
    // const {item, periodList} = location.state;
    const [item, setItem] = useState<any>();
    const [periodList, setPeriodList] = useState<any>();

    const onChangePlan = () => {
        push(Router.PlanPage);
    };

    async function initNewAccount() {
        const token = AccountUtil.getToken();
        let accountId;
        if (!token) {
            accountId = await AccountUtil.newAccount();
        } else {
            accountId = AccountUtil.getAccountId();
        }
        if (accountId) {
            setAccountInfo({
                account_id: accountId,
                account_status: "false"
            })
            const sessionInfo = await AccountUtil.newSession(accountId);
            const { token, service_status } = sessionInfo;
        }
    }

    function onSelectChange(periodItem: any) {
        setPeriodItem(periodItem);
    }

    async function coinPay() {
        if (!item) {
            Modal.info("请选择套餐周期");
            return;
        }
        if (!periodItem || !periodItem.days) {
            Modal.info("请选择套餐周期");
            return;
        }
        const product_id = item.id;
        const period = periodItem.days;

        const { data: res } = await http.createPayment(period, product_id)

        console.log(res);


        if (res) {
            push(Router.PayPage, { state: res })
        } else {
            Modal.info("请求支付失败,请重试");
        }
    }


    async function onClickCoinPay() {
        if (!item) {
            // console.error("item is null")
            Modal.info("请选择套餐周期");
            return;
        }
        if (!periodItem || !periodItem.days) {
            // console.error("periodItem is null")
            Modal.info("请选择套餐周期");
            return;
        }
        // console.log(item, periodItem);
        const product_id = item.id;
        const period = periodItem.days;
        const pay_method = "chain";
        const amount = periodItem.price;
        const unit = "usdt";
        const returnUrl = config.domain + Router.PayResultPage;
        console.log(period, amount);
        if (period && amount) {
            const ret = await AccountUtil.newSubscriptions(product_id, period, pay_method, amount, unit, returnUrl);
            console.log("ret", ret);
            if (ret) {
                const redirectUrl = ret.pay_redirect;
                window.location.href = redirectUrl;
                // if(Common.isSafari()){
                //     window.location.href = redirectUrl;
                //     const newWindow = window.open();
                //     // @ts-ignore
                //     newWindow.opener = null;
                //     // @ts-ignore
                //     newWindow.location.href = redirectUrl;
                // }else {
                //     window.open(redirectUrl);
                // }
            } else {
                Modal.info("请求支付失败,请重试");
            }
        }
    }

    async function onClickZFBPay(pay_method: any) {
        if (!item) {
            console.error("item is null")
            Modal.info("请选择套餐周期");
            return;
        }
        if (!periodItem || !periodItem.days) {
            console.error("periodItem is null")
            Modal.info("请选择套餐周期");
            return;
        }
        const product_id = item.id;
        const period = periodItem.days;
        // const pay_method = "zfb";
        const amount = periodItem.price2;
        // const amount = periodItem.priceCad;
        const unit = "cny";
        const returnUrl = config.domain + Router.PayResultPage;
        console.log(period, amount);
        if (period && amount) {
            const ret = await AccountUtil.newSubscriptions(product_id, period, pay_method, amount, unit, returnUrl);
            console.log("ret", ret);
            if (ret) {
                const redirectUrl = ret.pay_redirect;
                window.location.href = redirectUrl;
                // window.open(redirectUrl);
            } else {
                Modal.info("发起支付失败", null, {
                    confirmTitle: ""
                });
            }
        }
    }

    async function initPlanData(location: Location) {
        let select = {
            method: ProductType.Pro,
            days: defaultDays,
        }
        if (location.state) {
            select = location.state;
        }
        const productInfoResult = await http.getProductByMethod(select.method);
        const { data: productInfo } = productInfoResult;
        const { periodPriceList } = productInfo;
        if (productInfo) {
            setItem(productInfo);
        }
        if (periodPriceList) {
            let _periodList: SelectListProps[] = [];
            if (periodPriceList && periodPriceList.length > 0) {
                periodPriceList.map((_item: any, i: number) => {
                    const period = {
                        id: i + 1,
                        originalPrice: _item.origPrice,
                        price: _item.price,
                        price2: _item.price2,
                        priceCad: _item.priceCad,
                        days: _item.period,
                    } as unknown as SelectListProps;
                    _periodList.push(period);
                })

                if (_periodList) {
                    const findOne = _periodList.find(o => o.days === defaultDays);
                    if (findOne) {
                        // @ts-ignore
                        setPeriodItem(findOne);
                    }
                }
                setPeriodList(_periodList);
            }
        }
    }


    /**
     * 初始化数据
     */
    useEffect(() => {
        const token = AccountUtil.getToken();
        if (!token) {
            push(Router.LoginPage);
            return
        }
        initNewAccount().then(() => {
            initPlanData(location);
        })
    }, [location]);

    return (
        <FragmentAccount mobile={true}>
            {
                item && <>
                    <div css={_css}>
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item active>
                                    <Link to={Router.AccountPage}>用户中心</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    捐赠
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="planSelect">
                            {/* <AccountInfo {...accountInfo}/>
                            <Line/> */}
                            <div className="continuePayInfo">
                                <div className="title">继续捐赠</div>
                                <div className="desc">仅支持波场链USDT进行捐赠</div>
                            </div>
                            <div className="curPlan">
                                <div className="cur">当前选择:{item.name}</div>
                                <div className="desc">
                                    <ul>
                                        {
                                            AccountUtil.parseQuanYi(item.limit)
                                        }
                                    </ul>
                                </div>
                                <div className="select" onClick={onChangePlan}>
                                    更改套餐
                                </div>
                                <div className="selectList">
                                    <SelectEx data={periodList} defaultDays={defaultDays} onChange={onSelectChange} />
                                </div>
                            </div>

                            {
                                item.method !== ProductType.Trail && <>
                                    <div className="payList">
                                        <Button
                                            onClick={coinPay}
                                            className="button"
                                            variant="secondary"
                                            size="lg"
                                        >
                                            Tether(USDT)
                                        </Button>
                                        {/*<Button*/}
                                        {/*    className="button"*/}
                                        {/*    variant="secondary"*/}
                                        {/*    size="lg"*/}
                                        {/*    onClick={() => {*/}
                                        {/*        onClickZFBPay("stripe");*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    VISA/万事达支付*/}
                                        {/*</Button>*/}
                                        {/* <Button
                                            className="button"
                                            variant="secondary"
                                            size="lg"
                                            onClick={() => {
                                                onClickZFBPay("zfb");
                                            }}
                                        >
                                            支付宝
                                        </Button> */}

                                        <a href={config.teachingLink} target="_blank">如何使用微信，支付宝购买USDT?</a>

                                    </div>
                                </>
                            }

                            {
                                item.method === ProductType.Trail && <>
                                    <Alert variant="success">
                                        免费会员不用捐赠,账号已经生效,可直接使用.
                                    </Alert>
                                </>
                            }

                        </div>
                    </div>
                </>
            }
            {
                !item && <>
                    <PlanItemSkeleton />
                </>
            }

        </FragmentAccount>
    );
};

const _css = css`
  .planSelect {
    background: #ffffff;
    border-radius: 10px;
    padding: 16px;

    & .continuePayInfo {
      & .title {
        font-weight: bold;
        font-size: 18px;
      }

      & .desc {
        margin-top: 18px;
      }
    }

    & .curPlan {
      margin-top: 18px;

      & .cur {
        font-weight: bold;
        font-size: 18px;
      }

      .desc{
        margin-top: 10px;
      }

      & .select {
        font-weight: normal;
        font-size: 18px;
        color: #615df0;
        margin-top: 10px;
        cursor: pointer;
      }

      & .selectList {
        margin-top: 10px;
      }
    }

    & .payList {
      display: flex;
      flex-direction: column;
      margin-top: 18px;

      & .button {
        margin: 8px 0;
        border-radius: 5px;
      }

      a{
        margin-top: 10px;
      }
    }
  }
`;
