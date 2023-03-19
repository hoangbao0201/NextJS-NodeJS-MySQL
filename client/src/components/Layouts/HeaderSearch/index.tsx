import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderSearch.module.scss";


import { useRouter } from "next/router";
import { NovelType } from "@/types";
import { useDebounce } from "@/hook/useDebounce";
import useClickOutSide from "@/hook/useClickOutSide";
import { getNovelsByTitle } from "@/services";
import LoadingSearch from "../LoadingSearch";
import { iconClose } from "public/icons";

const cx = classNames.bind(styles);

export interface HeaderSearchProps {}

const HeaderSearch = () => {
    const router = useRouter();
    const refModalSearch = useRef<HTMLDivElement>(null);
    const [valueInputSearch, setValueInputSearch] = useState("")
    const [listNovelSearch, setListNovelSearch] = useState<NovelType[]>([])
    const [isModalSearch, setIsModalSearch] = useState<boolean>(false);
    const [isLoadingSearchNovel, setIsLoadingSearchNovel] = useState(false)

    let textInputSearchDebounce = useDebounce(valueInputSearch, 500);
    
    const eventHiddentModalSearch = () => {
        setIsModalSearch(false);
    }
    useClickOutSide(refModalSearch, eventHiddentModalSearch);

    const eventOnchangeValueInputSearch = (e : any) => {
        setValueInputSearch(e.target.value)
    }

    const handleSearchNovel = async () => {
        try {
            const convertValueInputSearch = valueInputSearch.trim()
            if(convertValueInputSearch == "") {
                setIsLoadingSearchNovel(false)
            }
            const novels : any = await getNovelsByTitle(convertValueInputSearch as string);
            if(!novels && !novels.data.success) {
                setListNovelSearch([])
                setIsLoadingSearchNovel(false)
                return
            }
            
            if(novels.data.novels == listNovelSearch) {
                setIsLoadingSearchNovel(false)
                return
            }


            setListNovelSearch(novels.data.novels)
            setIsLoadingSearchNovel(false)

        } catch (error) {
            console.log(error)
        }
    }

    const eventDeleteValueInputSearch = () => {
        textInputSearchDebounce = ""
        setValueInputSearch("")
        setListNovelSearch([])
        setIsLoadingSearchNovel(false)
    }

    useEffect(() => {
        if(textInputSearchDebounce === "" ) {
            setListNovelSearch([])
        }
        else if(textInputSearchDebounce){
            setIsLoadingSearchNovel(true)
            handleSearchNovel()
        }
    }, [textInputSearchDebounce])

    useEffect(() => {
        const handleRouteChange = () => {
            setIsModalSearch(false);
        };
    
        router.events.on("routeChangeStart", handleRouteChange);
    
        return () => {
          router.events.off("routeChangeStart", handleRouteChange);
        };
    }, []);

    return (
        <div className={cx("content")}>
            <span onClick={() => setIsModalSearch(true)} className={cx("button-search")}>Tìm kiếm</span>
            <div className={cx("overlay", `${isModalSearch && "show"}`)}>

                <div ref={refModalSearch} className={cx("modal-search")}>
                    
                    <div className={cx("head")}>
                        <div className={cx("title")}>Tìm kiếm truyện</div>
                        <div className={cx("form-search")}>
                            <input value={valueInputSearch} onChange={eventOnchangeValueInputSearch} className={cx("input-search")} placeholder="Tìm kiếm"/>
                            {
                                isLoadingSearchNovel ? (
                                    <span className={cx("icon-input-search", "loading-search")}><LoadingSearch /></span>
                                ) : (
                                    valueInputSearch !== "" && (<span onClick={eventDeleteValueInputSearch} className={cx("icon-input-search", "delete-search")}>{iconClose}</span>)
                                )
                            }
                        </div>
                    </div>

                    <div className={cx("modal-content")}>

                        {
                            listNovelSearch.length > 0 ? (
                                listNovelSearch.map((novel) => {
                                    return (
                                        // <Link key={novel._id} href={novel.slug}>
                                            <div key={novel.novelId}  className={cx("card")}>
                                                <div className={cx("card-content")}>
                                                    <Link href={`/novel/${novel.slug}`}>
                                                        <img src={novel.thumbnailUrl} className={cx("novel-thumbnail")} />
                                                    </Link>
                                                    <div className={cx("info-novel")}>
                                                        <Link href={`/novel/${novel.slug}`}>
                                                            <h2 className={cx("title")}>{novel.title}</h2>
                                                        </Link>
                                                        <div className={cx("list-genres")}>
                                                            { novel.category && <div className={cx("item", "category")}>{novel.category}</div> }
                                                            { novel.personality && <div className={cx("item", "personality")}>{novel.personality}</div> }
                                                            { novel.scene && <div className={cx("item", "scene")}>{novel.scene}</div> }
                                                            { novel.classify && <div className={cx("item", "classify")}>{novel.classify}</div> }
                                                            { novel.viewFrame && <div className={cx("item", "viewFrame")}>{novel.viewFrame}</div> }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        // </Link>
                                    )
                                })
                            ) : (
                                !isLoadingSearchNovel
                                && textInputSearchDebounce != ""
                                && valueInputSearch
                                && <div>Không tìm thấy truyện bạn cần tìm</div>
                            )
                        }

                    </div>

                </div>

            </div>
        </div>
    );
};

export default HeaderSearch;
