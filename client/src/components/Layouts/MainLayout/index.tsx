import { ReactNode, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, removeAccessToken } from "@/utils/cookies";
import { logoutUserHandle } from "@/redux/userSlice";

// const Header = dynamic(() => import("../../partials/Header"));
// const Footer = dynamic(() => import("../../partials/Footer"));

const cx = classNames.bind(styles);

interface MainLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

const MainLayout = ({ children, showHeader, showFooter }: MainLayoutProps) => {
    const dispatch = useDispatch();
    const { currentUser, userLoading, isAuthenticated } = useSelector(
        (state: any) => state.user
    );

    const loadUser = async () => {
        try {
            const token = getAccessToken();
            if (!token) {
                dispatch(logoutUserHandle());
                removeAccessToken();
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userLoading) {
            loadUser();
        }
    }, []);

    return (
        <>
            { showHeader && <Header />}

            <main>{children}</main>

            { showFooter && <Footer />}
        </>
    );
};

export default MainLayout;
