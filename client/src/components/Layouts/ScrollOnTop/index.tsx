import classNames from "classnames/bind";
import { iconArrowTop } from "public/icons";
import { useEffect, useRef, useState } from "react";
import styles from "./ScrollOnTop.module.scss";

const cx = classNames.bind(styles);

const ScrollOnTop = () => {
    const buttonRef = useRef<any>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 150) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        };
    }, []);

    const eventOnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {showButton ? (
                <button
                    ref={buttonRef}
                    onClick={eventOnTop}
                    className={cx("button")}
                >
                    <div className={cx("content")}>{iconArrowTop}</div>
                </button>
            ) : null}
        </>
    );
};

export default ScrollOnTop;
