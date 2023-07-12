import { Banner } from "../../components/banner";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { SectionFeature } from "./sections/feature";
import { SectionService } from "./sections/service";
import { SectionSolution } from "./sections/solution";
import { SectionDownload } from "./sections/download";
import { useLocation, useParams } from "react-router-dom";
import { cache } from "../../utils/cache";
import { config } from "../../utils/config";
import { useEffect } from "react";
import { PwaInstall } from "./sections/pwa-install";
import { SectionQuestion } from "./sections/question";
import { useNavigate } from "react-router-dom";
import { Router } from "../../utils/router";

const IndexPage = () => {

    const { code } = useParams()
    const location = useLocation();
    const push = useNavigate();
    if (code) {
        cache.set(config.shareCode, code);
    }

    useEffect(() => {
        if (location.pathname.includes("/i/")) {
            const url = cache.get(config.token) ? Router.AccountPage : Router.ShareRegisterPage
            push(url)
        }

        if (location.hash) {
            const eleId = location.hash.replace("#", "");

            if (eleId) {
                const ele = document.getElementById(eleId);
                if (ele) {
                    ele.scrollIntoView(
                        {
                            behavior: "smooth",
                            inline: "nearest"
                        }
                    );
                }
            }
        }
    }, [])

    return (
        <>
            <Header />
            <PwaInstall />
            <Banner />
            <SectionFeature />
            <SectionSolution />
            <SectionService />
            <SectionDownload />
            <SectionQuestion />
            <Footer />
        </>
    );
};

export default IndexPage;
