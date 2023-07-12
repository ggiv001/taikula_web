/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {useEffect, useState} from "react";
import {Selected} from "../images";

export interface SelectExProps {
    data: SelectListProps[];
    defaultDays?: number;
    onChange?: any;
}

export interface SelectListProps {
    id: string;
    originalPrice?: number | string;
    price: number;
    priceCad: number;
    days: number;
}

export const SelectEx = ({data, defaultDays, onChange}: SelectExProps) => {
    const [selectDays, setSelectDays] = useState(defaultDays);

    const onSelectItem = (item: SelectListProps) => {
        setSelectDays(item.days);
        if (onChange) {
            onChange(item);
        }
    };

    return (
        <>
            <div css={_css}>
                <div className="priceList">
                    {data &&
                        data.map((item, i) => {
                            return (
                                <div
                                    onClick={() => onSelectItem(item)}
                                    key={i}
                                    className={`priceItem ${
                                        selectDays === item.days ? "selected" : ""
                                    }`}
                                >
                                    <div className="left">
                                        {daysConvert(item.days)}
                                    </div>
                                    {item.originalPrice && (
                                        <div className="middle">
                                            <del>${item.originalPrice}</del>
                                        </div>
                                    )}

                                    <div className="right">
                                        <div className="price">
                                            {/*<div className="price2">  ${item.price} </div>*/}
                                            <div className="price2 calcMon">
                                                <span className="big"> {calcMonthPrice(item.days, item.price)}</span>
                                                <span className="split">/</span>
                                                <span className="small">月</span>
                                            </div>
                                        </div>
                                        <div
                                            className={`${
                                                selectDays === item.days
                                                    ? "selected"
                                                    : "hide"
                                            }`}
                                        >
                                            <div className="selected-box">
                                                <Selected/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

function calcMonthPrice(days: number, total: any) {
    if (total === '0' || total === 0) {
        return "$0";
    }
    let ret = total / days * 30;
    if (ret <= 0) {
        return "";
    }
    return "$" + Math.floor(ret);
}

function daysConvert(days: number) {
    let ret = "";
    switch (days) {
        case 30:
            ret = "1月";
            break;
        case 60:
            ret = "2月";
            break;
        case 90:
            ret = "3月";
            break;
        case 120:
            ret = "4月";
            break;
        case 150:
            ret = "5月";
            break;
        case 180:
            ret = "半年";
            break;
        case 360:
            ret = "1年";
            break;
        case 720:
            ret = "2年";
            break;
        default:
            if (days < 1) {
                ret = (24 * days).toFixed(0) + "小时";
            } else {
                ret = days + "天";
            }
            break;
    }
    return ret;
}


const _css = css`
  & .priceList {

    & .selected {
      background: #e7f1ff !important;
      color: #5d59f0;
      font-weight: bold;
    }

    & .priceItem {
      cursor: pointer;
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0px;
      background: #ebedf0;
      padding: 10px 0px 10px 8px;
      border-radius: 5px;

      & .right {
        color: #5551ef;
        font-weight: bold;

        & .price {
          margin-right: 10px;

          & .split {
            margin: 0 3px;
          }

          & .big {
            font-size: 20px;
            color: red;
          }

          & .small {
            font-size: 13px;
          }
        }

        & .price2 {
          display: inline-block;
        }

        & .calcMon {
          margin-left: 10px;
          //color: #87aecc;
        }

        & .hide {
          display: none;
        }

        & .selected {
          background: #e7f1ff;
          position: absolute;
          right: 0;
          bottom: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid #1677ff;
          border-left: 10px solid transparent;
          border-right: 10px solid #1677ff;

          & .selected-box {
            & > svg {
              position: absolute;
              height: 6px;
              width: 8px;
            }
          }
        }
      }

      & .middle {
        color: #6e6e6e;
      }
    }
  }
`;
