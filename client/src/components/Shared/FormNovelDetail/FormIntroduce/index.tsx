import Link from "next/link";
import { NextPage } from "next";
import classNames from "classnames/bind";

import styles from "./FormIntroduce.module.scss";
import { iconBook } from "public/icons";

const cx = classNames.bind(styles);

export interface FormIntroduceProps {
    description?: any
}

const FormIntroduce : NextPage<FormIntroduceProps>= ({ description }) => {


    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-left", "dev-col-8")}>
                <div className={cx("description")}>
                    <div className={cx("text")} dangerouslySetInnerHTML={{
                        __html: description
                    }}/>
                </div>
                <div className={cx("info-lastest")}>
                    <div className={cx("emotions")}>
                        <span className={cx("title")}>Cảm xúc</span>
                        <div className={cx("line-emotions")}>
                            <span className={cx("icon-emotion", "heart")}></span>
                            <span className={cx("quantity-emotion")}>9730</span>
    
                            <span className={cx("icon-emotion", "like")}></span>
                            <span className={cx("quantity-emotion")}>13437</span>
    
                            <span className={cx("icon-emotion", "funny")}></span>
                            <span className={cx("quantity-emotion")}>2892</span>
    
                            <span className={cx("icon-emotion", "sad")}></span>
                            <span className={cx("quantity-emotion")}>300</span>
    
                            <span className={cx("icon-emotion", "angry")}></span>
                            <span className={cx("quantity-emotion")}>10</span>
    
                            <span className={cx("icon-emotion", "attack")}></span>
                            <span className={cx("quantity-emotion")}>703</span>
                        </div>
                    </div>
                    <div className={cx("nominations")}>
                        <span className={cx("title")}>Đề cử</span>
                        <div className={cx("line-nominations")}>
                            <span className={cx("icon-emotion", "flower")}></span>
                            <span className={cx("quantity-emotion")}>9730</span>
                        </div>
                    </div>
                    <div className={cx("chapter-lastest")}>
                        <span className={cx("title")}>Chương mới</span>
                        <div className={cx("line-chapter")}>
                            <Link href="">
                                <span>Chương 1339: Chuẩn bị ở sau</span>
                            </Link>
                            <span className={cx("time")}>34 phút trước</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("content-left", "dev-col-4")}>
                <div className={cx("info-user")}>
                    <div className={cx("form-user")}>
                        <div className={cx("head-user")}>
                            <img className={cx("avatar")} src="/images/avatar-default-2.png"/>
                            <span className={cx("badge-user")}>vàng</span>
                            <span className={cx("user-name")}>Nguyễn Hoàng Bảo</span>
                        </div>
                        <div className={cx("info-creator")}>
                            <div className={cx("tab", "")}>
                                <div className={cx("icon-info")}>{iconBook}</div>
                                Số truyện
                                <div className={cx("number-info")}>238</div>
                            </div>
                            <div className={cx("tab", "")}>
                                <div className={cx("icon-info")}>{iconBook}</div>
                                Số chương
                                <div className={cx("number-info")}>138k</div>
                            </div>
                            <div className={cx("tab", "")}>
                                <div className={cx("icon-info")}>{iconBook}</div>
                                Cấp
                                <div className={cx("number-info")}>4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormIntroduce;
