import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./reboot.css";
import "./App.css";
import IndexPage from "./pages/index/index";
import {LoginPage} from "./pages/account/login";
import {RegisterPage} from "./pages/account/register";
import {ShareRegisterPage} from "./pages/account/share-register";
import {PlanPage} from "./pages/account/plan";
import {PlanSelectPage} from "./pages/account/plan-select";
import {AccountIndexPage} from "./pages/account";
import {PayResultPage} from "./pages/account/pay-result";
import {Router} from "./utils/router";
import {PartnerPage} from "./pages/parter";
import {PartnerApplyPage} from "./pages/parter/apply";
import {PartnerSubListPage} from "./pages/parter/sub-list";
import {ErrorBoundary} from "./components/error-boundary";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {TosPage} from "./pages/other/tos";
import {PrivacyPage} from "./pages/other/privacy";
import {WithdrawListPage} from "./pages/parter/withdraw-list";
import {DownloadPage} from "./pages/index/download";
import {InvitationPage} from "./pages/account/invitation";
import {PayPage} from "./pages/account/pay";

import {FpjsProvider} from '@fingerprintjs/fingerprintjs-pro-react';

const router = createBrowserRouter([
    {
        path: Router.IndexPage,
        element: <IndexPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.InvitePage,
        element: <IndexPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.AccountPage,
        element: <AccountIndexPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.LoginPage,
        element: <LoginPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.RegisterPage,
        element: <RegisterPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.ShareRegisterPage,
        element: <ShareRegisterPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PlanPage,
        element: <PlanPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PlanSelectPage,
        element: <PlanSelectPage/>,
        // errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PayResultPage,
        element: <PayResultPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PayPage,
        element: <PayPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PartnerPage,
        element: <PartnerPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PartnerApplyPage,
        element: <PartnerApplyPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.PartnerSubListPage,
        element: <PartnerSubListPage/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: Router.TosPage,
        element: <TosPage/>
    },
    {
        path: Router.PrivacyPage,
        element: <PrivacyPage/>
    },
    {
        path: Router.WithdrawPage,
        element: <WithdrawListPage/>
    },
    {
        path: Router.DownloadPage,
        element: <DownloadPage/>
    },
    {
        path: Router.InvitationPage,
        element: <InvitationPage/>
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
    <FpjsProvider
        loadOptions={{
            apiKey: "04GiW6U4ayichm9QwQ4Q",
            region: "ap"
        }}
    >
        <RouterProvider router={router}/>
    </FpjsProvider>
    // </React.StrictMode>
);

serviceWorkerRegistration.unregister();
