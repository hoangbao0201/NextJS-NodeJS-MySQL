import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useState } from "react";
import { GENRES_NT, RANK_NT } from "@/constants";
import useClickOutSide from "@/hook/useClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "@/types";
import { logoutUserHandle } from "@/redux/userSlice";
import { useRouter } from "next/dist/client/router";
import { iconArrowTop } from "public/icons";
import { removeAccessToken } from "@/utils/cookies";
import HeaderSearch from "@/components/Layouts/HeaderSearch";
import LoadingLayout from "@/components/Layouts/LoadingLayout";

export interface HeaderProps {}

const Header = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { currentUser, userLoading, isAuthenticated } = useSelector((state : any) => state.user)

    const refDropdownGenres = useRef<HTMLDivElement>(null)
    const refDropdownRank = useRef<HTMLDivElement>(null)
    const refDropdownUserHeader = useRef<HTMLDivElement>(null)

    const [isDropDownGenres, setIsDropDownGenres] = useState<boolean>(false);
    const [isDropDownRank, setIsDropDownRank] = useState<boolean>(false);
    const [isDropdownUserHeader, setIsDropdownUserHeader] = useState(false)
    const [userData, setUserData] = useState<UserType | null | undefined>(undefined);


    const eventHiddentDropdownGenres = () => {
        setIsDropDownGenres(false);
    }
    const eventHiddentDropdownRank = () => {
        setIsDropDownRank(false);
    }
    const eventHiddentDropdownUserHeader = () => {
        setIsDropdownUserHeader(false);
    }

    const eventLogoutUser = () => {
        dispatch(logoutUserHandle());
        removeAccessToken()
    }

    useClickOutSide(refDropdownGenres, eventHiddentDropdownGenres)
    useClickOutSide(refDropdownRank, eventHiddentDropdownRank)
    useClickOutSide(refDropdownUserHeader, eventHiddentDropdownUserHeader)

    useEffect(() => {
        const handleRouteChange = () => {
            eventHiddentDropdownUserHeader()
            eventHiddentDropdownGenres()
            eventHiddentDropdownRank()
        };
    
        router.events.on("routeChangeStart", handleRouteChange);
    
        return () => {
          router.events.off("routeChangeStart", handleRouteChange);
        };
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("content-left")}>
                    <Link className={cx("logo")} href="/">
                        NETNOVEL
                    </Link>

                    <nav className={cx("nav")}>
                        <div onClick={() => setIsDropDownGenres(true)} className={cx("nav-button", `${isDropDownGenres && "show"}`)}>
                            Thể loại {iconArrowTop}
                        </div>
                        <div ref={refDropdownGenres} className={cx("dropdown", "category", `${isDropDownGenres && "show"}`)}>
                            <div className={cx("dropdown-content")}>
                                {GENRES_NT.map(item => {
                                    return (
                                        <Link key={item.id} href={`/${item.slug}`}>
                                            <div className={cx("dropdown-item")}>{item.value}</div>
                                        </Link>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </nav>

                    <nav className={cx("nav")}>
                        <button onClick={() => setIsDropDownRank(true)} className={cx("nav-button", `${isDropDownRank && "show"}`)}>
                            Bảng xếp hạng {iconArrowTop}
                        </button>
                        <div ref={refDropdownRank} className={cx("dropdown", "rank", `${isDropDownRank && "show"}`)}>
                            <div className={cx("dropdown-content")}>
                                {RANK_NT.map(item => {
                                    return (
                                        <Link key={item.id} href={`/${item.slug}`}>
                                            <div className={cx("dropdown-item")}>{item.value}</div>
                                        </Link>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </nav>

                </div>

                <div className={cx("content-right")}>
                    <div className={cx("search")}>
                        <HeaderSearch />
                    </div>
                    <div className={cx("accout")}>
                        {
                            ( userLoading && <LoadingLayout /> ) || (
                                isAuthenticated ? (
                                <div className={cx("form-user")}>
                                    <div className={cx("user")} onClick={() => setIsDropdownUserHeader(true)} >
                                        <img className={cx("avatar")} src="/images/avatar-default-2.png"/>
                                    </div>
                                    {
                                        isDropdownUserHeader && (
                                            <div ref={refDropdownUserHeader} className={cx("dropdown-user")}>
                                                <div className={cx("dropdown-header")}>
                                                    <img className={cx("dropdown-header-avatar")} src="/images/avatar-default-2.png"/>
                                                    <div>{currentUser.username}</div>
                                                </div>
                                                <div className={cx("dropdown-content")}>
                                                    <Link href={`/user/${currentUser.username}`} className={cx("dropdown-item")}>Hồ sơ</Link>
                                                    <Link href={`/search`} className={cx("dropdown-item")}>Tìm truyện</Link>
                                                    <Link href={`/creator`} target="_blank" className={cx("dropdown-item")}>Người sánh tạo</Link>
                                                    <div onClick={eventLogoutUser} className={cx("dropdown-item")}>Đăng xuất</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                    
                                ) : (
                                    
                                    <>
                                        <Link href="/auth/login">
                                            <div className={cx("button", "login")}>Đăng nhập</div>
                                        </Link>
                                        <Link href="/auth/register">
                                            <div className={cx("button", "register")}>Đăng kí</div>
                                        </Link>
                                    </>
                                )
                            )
                        }
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Header;
