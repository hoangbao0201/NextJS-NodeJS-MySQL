import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";

import styles from "./ContentChapters.module.scss";
import { ChapterType } from "@/types";
import LoadingForm from "@/components/Layouts/LoadingForm";
import { getChaptersNovelByUrlHandle } from "@/services/chapter.services";

const cx = classNames.bind(styles);

interface ContentChaptersProps {
    slug?: string;
}

const ContentChapters = ({ slug }: ContentChaptersProps) => {

    const [bodyContent, setBodyContent] = useState<ChapterType[] | null>(null)

    const getListChapters = async () => {
        const chaptersResponse = await getChaptersNovelByUrlHandle(slug as string);
        if (chaptersResponse?.data.success) {
            console.log(chaptersResponse.data.chapters)
            setBodyContent(chaptersResponse.data.chapters)
        }
    };

    useEffect(() => {
        getListChapters();
    }, []);

    if(!bodyContent) {
        return <LoadingForm />
    }
    else {
        if(bodyContent) {
            return (
                <div className={cx("content")}>
                    <div className={cx("head")}>Danh sách chương</div>
                    <div className={cx("list-chapters")}>
                        {bodyContent.map((chapter : ChapterType, index) => {
                            return (
                                <Link key={index} href={`/novel/${chapter.novelSlug}/chuong-${chapter.chapterNumber}`} className={cx("item-chap")}>
                                    <span className={cx("item-text")}>
                                        Chương {chapter.chapterNumber}: {chapter.title}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            );
        }
        else {
            return <div>Không có chương nào</div>
        }
    }
};

export default ContentChapters;
