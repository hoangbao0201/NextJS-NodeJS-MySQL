import classNames from "classnames/bind";
import styles from "./LoadingSearch.module.scss";

const cx = classNames.bind(styles);

export interface LoadingProps {
    type?: string
    size?: string
}

const LoadingSearch = ({ type, size } : LoadingProps) => {

    let bodyLoad = <span className={cx("loading-button")}></span>;
    if(type == "overlay") {
        bodyLoad = <span className={cx("loading-overlay")}></span>
    }

    return (
       <span className={cx("loader", `${size || "sm" }`)}></span>
    )
}

export default LoadingSearch