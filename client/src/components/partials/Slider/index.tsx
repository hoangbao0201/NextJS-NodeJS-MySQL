import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

export interface SliderProps {}

const Slider = () => {

    return (
        <div className={cx("content")}>
            <img alt="thumbnail-slider" className={cx("image-slider")} src={`/images/slider-thumbnail-${Math.floor(Math.random() * 7) + 1}.png`}/>
            <div className={cx("blur-image")}></div>
        </div>
    );
};

export default Slider;
