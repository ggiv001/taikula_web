import { easy_download_icon, enjoy_wordwide_icon, instant_setup_icon } from "../../../images";

export const SectionFeature = () => {
    return (
        <>
            <section className="pt-120 pb-90 feature">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section-title title-shape text-center">
                                <h2>抵制网络监控</h2>
                                <p>
                                    您可能不了解或不信任的组织可以跟踪您在网上所做的事情，并成为永久记录的一部分。VPN 无法自行解决此问题，但可以阻止您的 ISP 共享或出售您的数据.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-content-center single-feature-wrap row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-feature">
                                <div className="feature-icon">
                                    <img
                                        src={easy_download_icon}
                                        alt="没有日志"
                                    />
                                </div>
                                <div className="feature-content">
                                    <h3>没有日志</h3>
                                    <p>
                                        我们不会记录与使用 taikula 服务有关的任何用户活动。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-feature">
                                <div className="feature-icon">
                                    <img
                                        src={instant_setup_icon}
                                        alt="私密浏览"
                                    />
                                </div>
                                <div className="feature-content">
                                    <h3>私密浏览</h3>
                                    <p>
                                        将您的互联网活动加密，任何人都无法跟踪或窃取您的数据。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-feature">
                                <div className="feature-icon">
                                    <img
                                        src={enjoy_wordwide_icon}
                                        alt="透明度"
                                    />
                                </div>
                                <div className="feature-content">
                                    <h3>更改 IP</h3>
                                    <p>
                                        使用不同 IP 地址，增加您的隐私，避免被跟踪。
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
