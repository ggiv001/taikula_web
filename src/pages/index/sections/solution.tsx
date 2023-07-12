import { editor, eye, man, solutionBg, solutionImg, s_main, woman } from "../../../images";

export const SectionSolution = () => {
    return (
        <>
            <section className="layer section-bg pt-120 pb-120 solution">
                <img
                    src={solutionBg}
                    alt="Solution Background Pattern"
                    className="section-pattern-img"
                />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="solution-img d-none d-xl-block">
                                <img src={s_main} alt="/Main" />
                                <img
                                    src={man}
                                    alt="/Man"
                                    className="s_man"
                                    style={{
                                        transform: "translate3d(0px, 0px, 0px)",
                                    }}
                                />
                                <img
                                    src={woman}
                                    alt="/Woman"
                                    className="s_woman"
                                    style={{
                                        transform: "translate3d(0px, 0px, 0px)",
                                    }}
                                />
                            </div>
                            <div className="solution-img-responsive d-xl-none">
                                <img src={solutionImg} alt="/Main" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="solution-content">
                                <div className="section-title style_2 title-shape">
                                    <h2>
                                        解锁独有优势
                                    </h2>
                                    <p>
                                        保护全家和所有设备。避开流量限制，找到最快的不限流带宽。要实现这一切，只需要一个方便好用的 taikula 帐户就行
                                    </p>
                                </div>
                                <div className="single-solution media align-items-center">
                                    <div className="img">
                                        <img src={editor} alt="Editor Icon" />
                                    </div>
                                    <div className="content media-body">
                                        <h3>不限流量</h3>
                                        <p>
                                            所有设备均不限访问流量
                                        </p>
                                    </div>
                                </div>
                                <div className="single-solution media align-items-center">
                                    <div className="img">
                                        <img src={eye} alt="Eye Icon" />
                                    </div>
                                    <div className="content media-body">
                                        <h3>拦截广告和恶意软件</h3>
                                        <p>
                                            利用业界领先技术AntiTracker阻止广告、广告软件、恶意网站和数据收集跟踪器.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
