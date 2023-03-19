import classNames from "classnames/bind";
import styles from "./LoadingLayout.module.scss";

const cx = classNames.bind(styles);

interface LoadingLayoutProps {
    w?: string
    h?: string
}

const LoadingLayout = ({ w, h } : LoadingLayoutProps) => {


    return <div style={{ width: `${w || "80px"}`, height: `${h || "28px"}` }} className={cx("loadingLayout", "placeholders")}></div>
}

export default LoadingLayout