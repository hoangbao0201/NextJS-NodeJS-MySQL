import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./ContentFormMyNovels.module.scss";

import {
    iconChartLine,
    iconInbox,
    iconList,
    iconPenToSquare,
    iconPlus,
    iconUpload,
} from "public/icons";
import { GetServerSideProps } from "next";
import { getNovelsByUserId } from "@/services";
import { getAccessToken } from "@/utils/cookies";

const cx = classNames.bind(styles);

export interface ContentFormMyNovelsProps {
    novels?: any
}

const ContentFormMyNovels = ({ novels } : ContentFormMyNovelsProps) => {

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                {novels.map((novel: any) => {
                    return (
                        <div key={novel._id} className={cx("card")}>
                            <div className={cx("container")}>
                                <div className={cx("head")}>
                                    <h2 className={cx("title")}>
                                        {novel.title}
                                    </h2>
                                </div>

                                <div className={cx("status", "warning")}>
                                    <p className={cx("text")}>
                                        Tình trạng: Chưa xuất bản
                                    </p>
                                </div>

                                <div className={cx("description")}>
                                    <p className={cx("text")}>
                                        Opps! Truyện này của bạn chưa có chương
                                        nào. Ấn vào dấu + bên dưới để bắt đầu
                                        thêm chương cho truyện thôi nào, nếu
                                        chưa biết phải viết gì thì ghé qua mục
                                        Kiến Thức Cơ Bản để tham khảo nhé
                                    </p>
                                </div>

                                <div className={cx("action")}>
                                    <div className={cx("list-button")}>
                                        <Link href="#" className={cx("button")}>
                                            {iconPlus}
                                        </Link>
                                        <Link href="#" className={cx("button")}>
                                            {iconList}
                                        </Link>
                                        <Link href="#" className={cx("button")}>
                                            {iconUpload}
                                        </Link>
                                        <Link href={`/creator/novels/edit/${novel.id}`} className={cx("button")}>
                                            {iconPenToSquare}
                                        </Link>
                                        <Link href="#" className={cx("button")}>
                                            {iconChartLine}
                                        </Link>
                                        <Link href="#" className={cx("button")}>
                                            {iconInbox}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContentFormMyNovels;
