import { ReactNode, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";

// const Header = dynamic(() => import("../../partials/Header"));
// const Footer = dynamic(() => import("../../partials/Footer"));

const cx = classNames.bind(styles);

interface MainLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

const MainLayout = ({ children, showHeader, showFooter }: MainLayoutProps) => {
    // const dispatch = useDispatch();
    // const { currentUser, userLoading, isAuthenticated } = useSelector(
    //     (state: any) => state.user
    // );

    // const loadUser = async () => {
    //     try {
    //         const token = getAccessToken();
    //         console.log(token);
    //         if (!token) {
    //             dispatch(logoutUserHandle());
    //             removeAccessToken();
    //             return;
    //         } else if (token) {
    //             const userResponse = await connectUser(token as string);
    //             if (userResponse?.data.success) {
    //                 console.log(userResponse.data.user);
    //                 dispatch(addUserHandle(userResponse.data.user));
    //                 return;
    //             }
    //         }

    //         dispatch(logoutUserHandle());
    //         removeAccessToken();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     if (userLoading) {
    //         loadUser();
    //     }
    // }, []);

    return (
        <>
            { showHeader && <Header />}

            <main>{children}</main>

            { showFooter && <Footer />}
        </>
    );
};

export default MainLayout;
