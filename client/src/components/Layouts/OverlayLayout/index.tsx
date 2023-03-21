import { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./OverlayLayout.module.scss";
const cx = classNames.bind(styles);

export interface OverlayLayoutProps {
    children: ReactNode;
    show: boolean | undefined;
}
const OverlayLayout = ({ children, show }: OverlayLayoutProps) => {

    return (
        <>
            <div className={cx("overlay", `${show ? "show" : ""}`)}></div>
            <div className={cx("content")}>{children}</div>
        </>
    );
};

export default OverlayLayout;
