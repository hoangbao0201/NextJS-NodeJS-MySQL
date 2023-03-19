import classNames from "classnames/bind";
import Link from "next/dist/client/link";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

export interface FooterProps {}

const Footer = () => {

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <span className={cx("logo")}>NETNOVEL</span>
                <span className={cx("description")}>
                    NETNOVEL là nền tảng mở trực tuyến, miễn phí đọc truyện chữ được convert hoặc dịch kỹ lưỡng, do các converter và dịch giả đóng góp, rất nhiều truyện hay và nổi bật được cập nhật nhanh nhất với đủ các thể loại tiên hiệp, kiếm hiệp, huyền ảo ...
                </span>

                <div className={cx("list-actions")}>
                    <Link className={cx("link-tab")} href="/">Điều khoản dịch vụ</Link>
                    <Link className={cx("link-tab")} href="/">Chính sách bảo mật</Link>
                    <Link className={cx("link-tab")} href="/">Về bản quyền</Link>
                    <Link className={cx("link-tab")} href="/">Hướng dẫn sử dụng</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
