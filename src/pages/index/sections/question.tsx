/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Accordion} from "react-bootstrap";


export const SectionQuestion = () => {
    return <div css={_css}>
        <h2 className="title">常见问题</h2>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>我为什么要选择泰裤辣?</Accordion.Header>
                <Accordion.Body>
                    <li>
                        安全保障：泰裤辣采用了高级加密技术来保护你的网络流量，让你的网络通讯变得更加安全。同时，它还能够屏蔽广告和恶意软件，减少网络攻击和入侵的风险。
                    </li>
                    <li>
                        隐私保护：使用泰裤辣可以保护你的个人隐私，隐藏你的真实IP地址，防止其他人跟踪你的在线活动。你可以匿名浏览互联网，避免被ISP、政府或其他第三方监视。
                    </li>
                    <li>
                        地理限制：泰裤辣可以帮助你突破地理限制，让你在任何地方都能访问被封锁的网站和应用程序。你可以通过连接到不同的服务器位置，访问国际网站和流媒体内容，获得更多的网络自由。
                    </li>
                    <li>
                        速度和稳定性：泰裤辣的服务器分布在全球各地，可以提供高速和稳定的网络连接。你可以通过选择最优的服务器来获得最佳的网络速度和稳定性，让你的网络体验更加流畅。
                    </li>
                    <li>
                        多平台支持：泰裤辣支持各种平台和设备，包括Windows、Mac、iOS、Android和Linux等操作系统，让你在不同的设备上都能方便地使用VPN服务。
                    </li>
                    <p>
                        总之，使用泰裤辣可以为你提供更安全、更自由、更快速和更稳定的网络连接，让你更加放心地上网，享受更好的网络体验。
                    </p>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>泰裤辣无法连接？</Accordion.Header>
                <Accordion.Body>
                    <li>
                        确认您的账号已经激活
                    </li>
                    <li>
                        确认您的网络连接正常，如无法连接请尝试切换网络
                    </li>
                    <li>确认您的VPN客户端是最新版本</li>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>泰裤辣连接速度慢？</Accordion.Header>
                <Accordion.Body>
                    <li>
                        尝试连接到距离您更近的服务器
                    </li>
                    <li>
                        检查您的网络连接是否正常
                    </li>
                    <li>关闭其他占用网络带宽的应用程序</li>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>泰裤辣无法打开某些网站或应用程序？
                </Accordion.Header>
                <Accordion.Body>
                    <li>
                        尝试更换服务器线路或模式
                    </li>
                    <li>
                        确认您的账号未过期或被封禁
                    </li>
                    <li>确认您所在的国家或地区是否允许访问该网站或应用程序
                    </li>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    </div>
}

const _css = css`
  margin: 14px 0;

  & .title {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
`;
