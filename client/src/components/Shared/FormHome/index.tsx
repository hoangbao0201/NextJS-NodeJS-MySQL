import classNames from "classnames/bind";
import styles from "./FormHome.module.scss";

import { NovelType } from "@/types";
import BooksRaiting from "./BookRaiting";
import Slider from "@/components/partials/Slider";
import CardNovel from "@/components/Layouts/CardNovel";

const cx = classNames.bind(styles);

export interface FormHomeProps {
    novels?: NovelType[]
}


const FormHome = ({ novels } : FormHomeProps) => {

    console.log(novels)

    return (
        <>
            <div className={cx("head-slider")}>
                <Slider />
            </div>
            <div className={cx("content")}>
    
                <div className={cx("list-post")}>
                    { novels ? ( 
                        novels.map((novel : any) => {
                            return <CardNovel key={novel.novelId} data={novel}/>
                        }) ) 
                        : (<p>Không có truyện nào</p>)
                    }
                </div>
    
                <div className={cx("list-raiting")}>
                    <BooksRaiting />
                </div>
            </div>
        </>
    );
};

export default FormHome;
