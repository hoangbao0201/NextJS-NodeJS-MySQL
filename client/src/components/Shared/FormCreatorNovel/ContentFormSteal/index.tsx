import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./ContentFormSteal.module.scss";
import { getAccessToken } from "@/utils/cookies";
import { createNovelByUrlHandle } from "@/services/novel.services";
import { createChapterByUrlHandle } from "@/services/chapter.services";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

export interface ContentFormStealProps {}

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: null,
};

interface Message {
    id: number;
    message: string;
}

const ContentFormSteal = () => {
    const router = useRouter();

    const messageProgressRef = useRef<HTMLDivElement>(null)
    const [urlInput, setUrlInput] = useState<string>("")
    const [progress, setProgress] = useState<number>(0);
    const [isProgress, setIsProgress] = useState<boolean>(false);
    const [dataMessageProgress, setDataMessageProgress] = useState<Message[]>([])

    // Value Form
    const eventOnChangeInputUrl = (e: any) => {
        setUrlInput(e.target.value)
    };

    const handleSubmitButtonCreatNovel = async (e: any) => {
        e.preventDefault();

        if(!urlInput) {
            return
        }
        
        try {

            const token = getAccessToken();
            if(!token) {
                setIsProgress(false);
                setProgress(0);
                return;
            }

            const novelResponse = await createNovelByUrlHandle(urlInput as string, token as string);
            if(novelResponse?.data.success) {

                setIsProgress(true)

                setDataMessageProgress(value => [...value, { id: 1, message: "Creact Novel - Thành công" }])
                setDataMessageProgress(value => [...value, { id: 2, message: "Upload Thumbnail Novel - Thành công" }])
                setProgress(1)

                for (let i = 1; i <= 99; i++) {
                    console.log(`${novelResponse?.data.novel.slug}/${i}`)
                    const chapterResponse = await createChapterByUrlHandle(`${novelResponse?.data.novel.slug}/${i}` as string, token as string)

                    if(!chapterResponse?.data.success) {
                        setIsProgress(false);
                        setProgress(0)
                        router.reload();
                        return
                    }
                    setDataMessageProgress(value => [ ...value, { id: i+2, message: `Upload Chương ${i} - Thành công` } ])
                    setProgress(value => value + 1)
                }
            }

            setIsProgress(false);
            setProgress(0)
            return

        } catch (error) {
            // setIsProgress(false);
            // setProgress(0)
            // console.log(error)
            router.reload();
        }
    };

    const scrollToBottom = () => {
        if (messageProgressRef.current) {
            messageProgressRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [dataMessageProgress]);
    

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("form")}>

                    <div className={cx("form-group")}>
                        <label className={cx("form-title")}>Url novel (metruyenchu)</label>
                        <input
                            className={cx("form-input")}
                            placeholder=""
                            name="urlText"
                            value={urlInput}
                            onChange={eventOnChangeInputUrl}
                        />
                    </div>

                    <div className={cx('line-progress')}>
                        {
                            isProgress && (
                                <div className={cx("progress-loading")}>
                                    <span style={{ width: `${progress}%` }}/>
                                </div>
                            )
                        }
                    </div>

                    <div className={cx("content")}>

                        <div className={cx("message-progress")}>
                            <div className={cx("box-content")}>
                                {  
                                    dataMessageProgress.map((data) => {
                                        return <div key={data.id}>{data.message}</div>
                                    })
                                }
                                <div ref={messageProgressRef}></div>
                            </div>
                        </div>

                        <button onClick={handleSubmitButtonCreatNovel} className={cx("button-create-novel")}>
                            Cập nhật {false && " - loading"}
                        </button>

                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ContentFormSteal;
