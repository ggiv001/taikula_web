/** @jsxImportSource @emotion/react */

import {FragmentAccount} from "../../components/layouts/fragment-account";
import {SpinnerEx} from "../../components/spinner";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {css} from "@emotion/react";
import {SelectEx, SelectListProps} from "../../components/select";
import {useEffect, useState} from "react";
import {http} from "../../utils/http";
import {PlanItemSkeleton} from "./component/plan-item-skeleton";
import {AccountUtil} from "../../utils/account";
import {Router} from "../../utils/router";
import {ProductType} from "../../utils/model";
import {Alert} from "react-bootstrap";

export const PlanPage = () => {
    const [productList, setProductList] = useState([]);
    async function initProductList() {
        const list = await http.getProductList();
        // console.log(list);
        const {data} = list;
        if (data) {
            setProductList(data);
        }
    }

    useEffect(() => {
        initProductList();
    }, [])
    return (
        <>
            <FragmentAccount>
                {
                    productList && <div css={_css}>
                        <div className="planTitle">
                            <div className="title">套餐选择</div>
                            <div className="desc">
                                选择合适的套餐将会立即创建您的账户,目前支持以下付款方式: Tether(USDT)
                            </div>
                        </div>
                        <div className="planList">
                            {
                                productList && productList.map((item, i) => {
                                    return <PlanItemApp item={item} key={i}/>
                                })
                            }
                            {
                                productList.length === 0 && <PlanItemSkeleton/>
                            }
                        </div>
                    </div>
                }

                {
                    !productList && <PlanItemSkeleton/>
                }

            </FragmentAccount>
        </>
    );
};

const PlanItemApp = ({item}: any) => {
    const defaultDays = 180;
    const push = useNavigate();
    const [selectPlan, setSelectPlan] = useState({
        method: item.method,
        days: 0,
    });
    const onClickSelectPay = (item: any, periodList: any) => {
        push(Router.PlanSelectPage, {state: selectPlan});
    };

    const {periodPriceList} = item;
    let periodList: SelectListProps[] = [];
    if (periodPriceList && periodPriceList.length > 0) {
        periodPriceList.map((_item: any, i: number) => {
            const period = {
                id: i + 1,
                originalPrice: _item.origPrice,
                price: _item.price,
                days: _item.period,
            } as unknown as SelectListProps;
            periodList.push(period);
        })
    }

    function onSelectChange(_item: any) {
        setSelectPlan({
            method: item.method,
            days: _item.days,
        })
    }

    return (
        <div className="planItem col-lg-4 col-md-6">
            <h4 className={`${item.recommend === "Y" ? "ribbon" : "hide"}`}>
                推荐
            </h4>
            <div className="title">{item.name}</div>
            <div className="desc">
                <ul>
                    {
                        AccountUtil.parseQuanYi(item.limit)
                    }
                </ul>
            </div>

            <SelectEx data={periodList} defaultDays={defaultDays} onChange={onSelectChange}/>

            <div className="selectButtonContainer">
                {
                    item.method != ProductType.Trail && <>
                    <Alert variant="success">
                            专业版只接受捐赠.
                        </Alert>
                        <Button
                            onClick={() => onClickSelectPay(item, periodList)}
                            className="selectButton"
                            variant="primary"
                            size="lg"
                        >
                            <SpinnerEx
                                as="span"
                                animation="false"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            选 择
                        </Button>
                    </>
                }
                {
                    item.method === ProductType.Trail && <>
                        <Alert variant="success">
                            免费会员不用捐赠.
                        </Alert>
                        <Button
                            onClick={() => onClickSelectPay(item, periodList)}
                            className="selectButton"
                            variant="primary"
                            size="lg"
                        >
                            <SpinnerEx
                                as="span"
                                animation="false"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            选择
                        </Button>
                    </>
                }
            </div>
        </div>
    );
};

const _css = css`
  .planTitle {
    color: #ffffff;

    & .title {
      font-size: 26px;
      font-weight: bold;
    }

    & .desc {
      margin: 16px 0;
    }
  }

  .planItem {
    background: #ffffff;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 10px;
    overflow: hidden;

    & .hide {
      display: none;
    }

    & .ribbon {
      background-color: #0fe705;
      position: absolute;
      height: 50px;
      color: #fff;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      top: 28px;
      right: -48px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    & .title {
      font-weight: bold;
      color: #252525;
    }

    & .desc {
      margin-top: 10px;
    }

    & .priceList {
      & .priceItem {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px 0px;

        & .right {
          color: #5551ef;
          font-weight: bold;
        }

        & .middle {
          color: #6e6e6e;
        }
      }
    }

    & .selectButtonContainer {
      margin-top: 18px;
    }

    & .selectButton {
      width: 100%;
      border-radius: 10px;
    }
  }

  @media only screen and (min-width: 992px) {
    .planList {
      display: flex;
      flex-direction: row;
    }

    .planItem {
      margin-right: 10px;
    }
  }
`;
