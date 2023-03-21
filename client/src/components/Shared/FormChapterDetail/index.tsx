import Link from "next/link";
import { NextPage } from "next";
import classNames from "classnames/bind";

import styles from "./FormChapterDetail.module.scss";
import { iconBook, iconChevronLeft, iconChevronRight } from "public/icons";
import { ChapterDetailProps } from "@/pages/novel/[slug]/[chapterNumber]";

const cx = classNames.bind(styles);

const FormChapterDetail : NextPage<ChapterDetailProps>= ({chapter}) => {

    return (
        <div className={cx("content")}>
            <div className={cx("content-head")}>
                <div className={cx("chapter-navigation")}>
                    <Link
                        href={`/novel/${chapter.novelSlug}/chuong-${
                            chapter.chapterNumber - 1
                        }`}
                        className={cx(
                            "button",
                            "btn-prev",
                            `${
                                chapter.chapterNumber - 1 == 0
                                    ? "disabled"
                                    : ""
                            }`
                        )}
                    >
                        {iconChevronLeft} Chương trước
                    </Link>
                    <Link
                        href={`/novel/${chapter.novelSlug}/chuong-${
                            chapter.chapterNumber + 1
                        }`}
                        className={cx(
                            "button", 
                            "btn-next",
                            `${
                                chapter.chapterCount === chapter.chapterNumber
                                    ? "disabled"
                                    : ""
                            }`
                        )}
                    >
                        Chương sau {iconChevronRight}
                    </Link>
                </div>

                <div className={cx("title")}>
                    Chương {chapter.chapterNumber}:{" "}
                    {chapter.title}
                </div>

                <div className={cx("chapter-detail")}>
                    <Link href={`/novel/${chapter.novelSlug}`} className={cx("title-novel")}>
                        {iconBook} 
                        {/* {chapter.novelName} */}
                    </Link>

                    <div className={cx("createAt-chapter")}>
                        {/* {convertTime(chapter.createdAt)} */}
                    </div>
                </div>

                <div
                    className={cx("content-chapter")}
                    dangerouslySetInnerHTML={{
                        __html:
                            chapter.content || "Lỗi hiển thị",
                    }}
                />
            </div>

            <div className={cx("chapter-navigation")}>
                <Link
                    href={`/novel/${chapter.novelSlug}/chuong-${
                        chapter.chapterNumber - 1
                    }`}
                    className={cx(
                        "button",
                        "btn-prev",
                        `${
                            chapter.chapterNumber - 1 == 0
                                ? "disabled"
                                : ""
                        }`
                    )}
                >
                    {iconChevronLeft} Chương trước
                </Link>
                <Link
                    href={`/novel/${chapter.novelSlug}/chuong-${
                        chapter.chapterNumber + 1
                    }`}
                    className={cx("button", "btn-next")}
                >
                    Chương sau {iconChevronRight}
                </Link>
            </div>
        </div>
    );
};

export default FormChapterDetail;
