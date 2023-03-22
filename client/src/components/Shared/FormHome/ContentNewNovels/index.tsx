import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./ContentNewNovels.module.scss";

import { HomeProps } from "@/pages";
import { NovelType } from "@/types";

const cx = classNames.bind(styles);

const ContentNewNovels = ({ newNovels }: HomeProps) => {
    return (
        <>
            <div className={cx("list-newNovels")}>
                <h3 className={cx("title")}>Mới cập nhật</h3>

                <table className={cx("table-newNovels")}>
                    <tbody>
                        { newNovels ? ( 
                            newNovels.map((novel : NovelType, index) => {
                                return (
                                    <tr className={cx("r-table")} key={index} style={{ backgroundColor: `${ index%2==0 && "#fcfcfa" }` }}>
                                        <td>
                                            <h2 className={cx("item-name")}>
                                                {novel.category}
                                            </h2>
                                        </td>
                                        <td className={cx("c-title")}>
                                            <h2 className={cx("item-name", "item-title")}>
                                                <Link href={`/truyen/${novel.slug}` || "/"}>
                                                    {novel.title}
                                                </Link>
                                            </h2>
                                        </td>
                                        <td className={cx("c-newChapter")}>
                                            <h2 className={cx("item-name", "item-newChapter")}>
                                                newChapter
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 className={cx("item-name")}>
                                                {novel.author}
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 className={cx("item-name")}>
                                                Nguyễn Hoàng Bảo
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 className={cx("item-name")}>
                                                5 phút trước
                                            </h2>
                                        </td>
                                    </tr>
                                )
                            }) ) 
                            : (<p>Không có truyện nào</p>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ContentNewNovels;
