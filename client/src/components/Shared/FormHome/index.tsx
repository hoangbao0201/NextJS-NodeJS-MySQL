import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./FormHome.module.scss";

import BooksRaiting from "./BookRaiting";
// import Slider from "@/components/partials/Slider";
import CardNovel from "@/components/Layouts/CardNovel";
import { HomeProps } from "@/pages";
import { NovelType } from "@/types";
import ContentNewNovels from "./ContentNewNovels";

const cx = classNames.bind(styles);

// export interface FormHomeProps {
//     novels?: NovelType[] | undefined
// }

const FormHome = ({ novels, newNovels }: HomeProps) => {
    return (
        <>
            <div className={cx("content")}>
                <div className={cx("list-post")}>
                    {novels ? (
                        novels.map((novel: any) => {
                            return (
                                <CardNovel key={novel.novelId} data={novel} />
                            );
                        })
                    ) : (
                        <p>Không có truyện nào</p>
                    )}
                </div>

                <div className={cx("list-newNovels")}>
                    <ContentNewNovels newNovels={newNovels}/>
                </div>

                <div className={cx("list-raiting")}>
                    <BooksRaiting />
                </div>
            </div>
        </>
    );
};

export default FormHome;
