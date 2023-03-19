import { ReactNode } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import styles from "./WrapperContent.module.scss";

interface WrapperContentProps {
    children: ReactNode;
    dark?: boolean | true;
    bgColor?: string;
    width?: string;
    top?: string;
    borderRadius?: string;
}

const WrapperContent = ({
    children,
    dark,
    bgColor,
    width,
    top,
    borderRadius,
}: WrapperContentProps) => {
    return (
        <div className={cx("wrapper", `${dark || "dark"}`)}>
            <div
                className={cx("container")}
                style={{
                    backgroundColor: bgColor,
                    maxWidth: width,
                    transform: top,
                    borderRadius: borderRadius,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default WrapperContent;
