/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {AccountTip} from "./account-tip";
import {Button} from "react-bootstrap";
import CopyText from 'copy-to-clipboard';
import Modal from "../../../components/modal";
import {QRCodeSVG} from "qrcode.react";

export function convertAccountStatus(status: string) {
    if (status) {
        return <div className="accountStatus statusActive">已激活</div>;
    }
    return <div className="accountStatus statusDeActive">未激活</div>;
}

export const AccountInfo = ({account_id, account_status}: any) => {
    function copyAccount() {
        const copyRet = CopyText(account_id);
        Modal.info("复制成功",null,{
            closeTitle: "关闭",
            confirmTitle: ""
        });
    }

    function showQrCode() {
        Modal.info(<QrCodeUi/>, null, {
            title: "账号二维码",
            closeTitle: "",
            confirmTitle: ""
        })
    }

    const QrCodeUi = () => {
        return <>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <QRCodeSVG value={account_id}/>
            </div>
        </>
    }

    return (
        <div css={_css}>
            <div className="accountInfo">
                <div className="accountLabel">用户账号</div>
                <div className="accountId">{account_id}</div>
                <div className="action">
                    <div>
                        <Button className="account-action-button" onClick={copyAccount}>复制账号</Button>
                    </div>
                    <div>
                        <Button className="account-action-button" onClick={showQrCode}>二维码</Button>
                    </div>
                </div>
                <AccountTip/>
                <div>
                    {
                        convertAccountStatus(account_status)
                    }
                </div>
            </div>
        </div>
    );
};

const _css = css`
  & .accountId {
    font-weight: bold;
    font-size: 26px;
    margin: 5px 0px;
  }

  & .accountStatus {
    background: grey;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    border-radius: 4px;
    margin: 5px 0px;
  }

  & .statusActive {
    background: #5551ef;
    color: #ffffff;
  }

  & .statusDeActive {
    background: grey;
    color: #ffffff;
  }

  & .action {
    display: flex;
    flex-direction: row;
    margin: 10px 0;

    & .account-action-button {
      align-items: center;
      background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
      border-radius: 3px;
      box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);;
      color: #969faf;
      display: flex;
      min-width: 60px;
      height: 30px;
      justify-content: center;
      margin-right: 0.4em;
      position: relative;
      padding: 6px;
      border: 0;
      top: -1px;
    }

    & .account-action-button::after {
      width: 0;
      height: 0;
    }
  }
`;
