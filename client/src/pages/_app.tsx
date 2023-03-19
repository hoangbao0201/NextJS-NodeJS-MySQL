import "@/styles/globals.scss";
import { NextPage } from "next";
import { Router } from "next/router";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

import "nprogress/nprogress.css";
import MainLayout from "@/components/Layouts/MainLayout";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithlayout = AppProps & {
    Component: NextPageWithLayout;
};

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { ...pageProps } }: AppPropsWithlayout) {
    const getLayout =
        Component.getLayout ??
            ((page) => (
                <MainLayout showHeader showFooter>
                    {page}
                </MainLayout>
            ));

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={true} persistor={persistor}>
                    {getLayout(<Component {...pageProps} />)}
                </PersistGate>
            </Provider>
        </>
    );
}
