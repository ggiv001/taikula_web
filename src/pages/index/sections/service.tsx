import { services_icon1, services_icon2, services_icon3, services_icon4, services_icon5, services_icon6 } from "../../../images";

export const SectionService = () => {
    return (
        <>
            <section id="service" className="pt-120 pb-90 service">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section-title title-shape text-center">
                                <h2>安全访问内容</h2>
                                <p>
                                    确保对您喜爱的内容进行安全和私密的访问。 使用 taikula 没人会知道您在网上做什么。
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-content-center row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-service hover-effect ">
                                <div className="service-icon">
                                    <img
                                        src={services_icon1}
                                        alt="/Service Icon"
                                    />
                                </div>
                                <div className="service-content">
                                    <a href="/single-service">
                                        <h3>避免旅行限制</h3>
                                    </a>
                                    <p>
                                        前往互联网受限的国家时，保持您的数字自由
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-service hover-effect ">
                                <div className="service-icon">
                                    <img
                                        src={services_icon2}
                                        alt="/Service Icon"
                                    />
                                </div>
                                <div className="service-content">
                                    <a href="/single-service">
                                        <h3>使用无审查的互联网</h3>
                                    </a>
                                    <p>
                                        快速安全访问阻止或审查的材料
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-service hover-effect ">
                                <div className="service-icon">
                                    <img
                                       src={services_icon3}
                                        alt="/Service Icon"
                                    />
                                </div>
                                <div className="service-content">
                                    <a href="/single-service">
                                        <h3>安全访问内容</h3>
                                    </a>
                                    <p>
                                        在世界各地私密和安全访问本地内容
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-service hover-effect ">
                                <div className="service-icon">
                                    <img
                                        src={services_icon4}
                                        alt="/Service Icon"
                                    />
                                </div>
                                <div className="service-content">
                                    <a href="/single-service">
                                        <h3>在公共 Wi-Fi 上保持安全</h3>
                                    </a>
                                    <p>
                                        使用不信任的 Wi-Fi 网络时保护您的数据和隐私
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-service hover-effect ">
                                <div className="service-icon">
                                    <img
                                        src={services_icon5}
                                        alt="/Service Icon"
                                    />
                                </div>
                                <div className="service-content">
                                    <a href="/single-service">
                                        <h3>隐私控制</h3>
                                    </a>
                                    <p>
                                        定义自动密钥和 IP 地址轮换的自定义计划
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-service hover-effect ">
                                <div className="service-icon">
                                    <img
                                        src={services_icon6}
                                        alt="/Service Icon"
                                    />
                                </div>
                                <div className="service-content">
                                    <a href="/single-service">
                                        <h3>观看受限电影/电视剧</h3>
                                    </a>
                                    <p>
                                        用户无需再被拴在实际的地理位置，而是可以在暗影中瞬移，然后悄悄出现在世界上的任意地点。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
