import classNames from "classnames/bind";
import styles from "./FormNovelDetail.module.scss";

import { NextPage } from "next";
import { NovelType } from "@/types";
import { useState } from "react";
import ContentChapters from "./ContentChapters";
import Link from "next/link";
import FormIntroduce from "./FormIntroduce";

const cx = classNames.bind(styles);

export interface FormNovelDetailProps {
    novel?: NovelType;
}

export interface ContentTab {
    tab: string
    slug: string
}

const ContentTab = ({ tab, slug }: ContentTab) => {
    if (tab === "review") {
        return <p>review</p>;
    }
    if (tab === "chap") {
        // return <ContentChapters slug={slug}/>;
        return null;
    }
    if (tab === "comment") {
        return <p>comment</p>;
    }

    return <p>fan</p>;
};

const FormNovelDetail: NextPage<FormNovelDetailProps> = ({ novel }) => {
    const [buttonTab, setButtonTab] = useState("intro");

    const eventClickButtonToggleTab = (e: any) => {
        // e.preventDefault()
        setButtonTab(e.target.name);
    };

    if (!novel) {
        return null;
    }
    return (
        <div className={cx("container")}>
            <div className={cx("head")}>
                <div className={cx("thumbnail")}>
                    <img
                        className={cx("image")}
                        src={
                            novel.thumbnailUrl || "/images/novel-default.png"
                        }
                    />
                </div>
                <div className={cx("detail")}>
                    <div className={cx("grid-name")}>
                        <h2 className={cx("title")}>{novel.title}</h2>
                    </div>
                    <div className={cx("list-genres")}>
                        { novel.author && <div className={cx("item", "author")}>{novel.author}</div> }
                        <div className={cx("item", "condition")}>{novel.chapters?.numberChaptersInWeek > 0 ? "Đang ra" : "Chưa ra chương mới"}</div>
                        { novel.category && <div className={cx("item", "category")}>{novel.category}</div> }
                        { novel.personality && <div className={cx("item", "personality")}>{novel.personality}</div> }
                        { novel.scene && <div className={cx("item", "scene")}>{novel.scene}</div> }
                        { novel.classify && <div className={cx("item", "classify")}>{novel.classify}</div> }
                        { novel.viewFrame && <div className={cx("item", "viewFrame")}>{novel.viewFrame}</div> }
                    </div>

                    <div className={cx("grid-number")}>
                        <div className={cx("detail-number", "number-chapter")}>
                            <div>{0}</div>
                            Chương
                        </div>
                        <div
                            className={cx(
                                "detail-number",
                                "number-chapter-week"
                            )}
                        >
                            <div>{0}</div>
                            Chương/tuần
                        </div>
                        <div className={cx("detail-number", "number-reads")}>
                            <div>{0}</div>
                            Lượt đọc
                        </div>
                        <div className={cx("detail-number", "number-store")}>
                            <div>2012</div>
                            Cất giữ
                        </div>
                    </div>

                    <div className={cx("action")}>
                        <div className={cx("grid-button")}>
                            <Link href={`${novel.slug}/chuong-1`}>
                                <button className={cx("button-action", "reading")}>
                                    Đọc tiếp
                                </button>
                            </Link>
                            <button
                                className={cx("button-action", "novelmark")}
                            >
                                Đánh dấu
                            </button>
                            <button
                                className={cx("button-action", "suggest-novel")}
                            >
                                Đề cử
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("page-content")}>
                <div className={cx("content-page")}>
                    <div className={cx("list-tab")}>
                        <button
                            name="intro"
                            onClick={eventClickButtonToggleTab}
                            className={cx(
                                "button-tab",
                                `${buttonTab === "intro" && "active"}`
                            )}
                        >
                            Giới thiệu
                        </button>
                        <button
                            name="review"
                            onClick={eventClickButtonToggleTab}
                            className={cx(
                                "button-tab",
                                `${buttonTab === "review" && "active"}`
                            )}
                        >
                            Đánh giá
                        </button>
                        <button
                            name="chap"
                            onClick={eventClickButtonToggleTab}
                            className={cx(
                                "button-tab",
                                `${buttonTab === "chap" && "active"}`
                            )}
                        >
                            D.s chương
                        </button>
                        <button
                            name="comment"
                            onClick={eventClickButtonToggleTab}
                            className={cx(
                                "button-tab",
                                `${buttonTab === "comment" && "active"}`
                            )}
                        >
                            Bình luận
                        </button>
                        <button
                            name="fan"
                            onClick={eventClickButtonToggleTab}
                            className={cx(
                                "button-tab",
                                `${buttonTab === "fan" && "active"}`
                            )}
                        >
                            Hâm mộ
                        </button>
                    </div>
                    <div className={cx("tab-content")}>
                        {buttonTab === "intro" ? (
                            <FormIntroduce description={novel?.description}/>
                        ) : (
                            <ContentTab tab={buttonTab} slug={novel.slug}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormNovelDetail;
