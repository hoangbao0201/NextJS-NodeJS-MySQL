import { ReactNode, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormCreatorNovel.module.scss";
const cx = classNames.bind(styles);

import Sidebar from "./Sidebar";
import useClickOutSide from "@/hook/useClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import LoadingLayout from "@/components/Layouts/LoadingLayout";
import { iconBars } from "public/icons";

export interface FormCreatorNovelProps {
    children?: ReactNode;
    tab?: string;
    title?: string;
    description?: string;
}

const FormCreatorNovel = ({
    children,
    tab,
    title,
    description,
}: FormCreatorNovelProps) => {

    const dispatch = useDispatch()
    const { currentUser, userLoading, isAuthenticated } = useSelector((state : any) => state.user)

    const refDropdown = useRef<any>();
    const [isShowDropdown, setIsShowDropdown] = useState(false);

    const [isNavbar, setIsNavbar] = useState<boolean>(false);

    const eventHiddentDropdownAccout = () => {
        setIsShowDropdown(false);
    };

    const handleCloseSidebar = () => {
        setIsNavbar(false);
    };

    useClickOutSide(refDropdown, eventHiddentDropdownAccout);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Sidebar
                    tab={tab}
                    isShow={isNavbar}
                    handleToggle={handleCloseSidebar}
                />

                <div className={cx("header")}>
                    <div className={cx("container")}>
                        <button
                            className={cx("button-show")}
                            onClick={() => setIsNavbar(true)}
                        >
                            {iconBars}
                        </button>
                        <div
                            className={cx("accout-user")}
                            onClick={() => setIsShowDropdown(true)}
                        >
                            <div className={cx("info-detail")}>
                                <h4 className={cx("username")}>
                                    { userLoading ? <LoadingLayout /> : (isAuthenticated ? currentUser.username : "Đang cập nhật")}
                                </h4>
                                <h4 className={cx("email")}>
                                    { userLoading ? <LoadingLayout /> : (isAuthenticated ? currentUser.email : "Đang cập nhật")}
                                </h4>
                            </div>
                            <div className={cx("avatar")}>
                                <img
                                    className={cx("image")}
                                    src="/images/avatar-default.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("content")}>
                    <div className={cx("content-header")}>
                        <h2 className={cx("title")}>
                            {title || "Đang cập nhật"}
                        </h2>
                        <h4 className={cx("description")}>
                            {description || "Đang cập nhật"}
                        </h4>
                    </div>

                    <div className={cx("content-form")}>
                        {children || "Tính năng đang cập nhật"}
                    </div>
                </div>

                <div className={cx("footer")}>
                    <div className={cx("footer-container")}>
                        © hobanovel.vervel.app 2023
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCreatorNovel;
