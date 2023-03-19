import classNames from "classnames/bind";
import styles from "./LoadingForm.module.scss";

const cx = classNames.bind(styles);

const LoadingForm = () => {


    return <div className={cx("content")}>
        <span className={cx("loadingForm")}></span>
    </div>
}

export default LoadingForm