import router from "next/router";
import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";

import { iconFacebook, iconGithub, iconGoogle } from "public/icons";
import { addAccessToken } from "@/utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { addUserHandle } from "@/redux/userSlice";
import { connectUserHandle, loginUserHandle } from "@/services/user.services";

const cx = classNames.bind(styles);

export interface FormLoginProps {}

const FormLogin = () => {
    const dispatch = useDispatch();
    const { userLoading, isAuthenticated, currentUser } = useSelector((state : any) => state.user)

    const [isError, setIsError] = useState<any>(null);
    const [dataForm, setDataForm] = useState({
        accout: "",
        password: "",
    });

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignIn = async (e: any) => {
        e.preventDefault();
    };

    const handleSubmitFormLoginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const loginResponse = await loginUserHandle(dataForm as any);

            // console.log(loginResponse?.data.accessToken)

            if (loginResponse?.data.success) {
                addAccessToken(loginResponse.data.accessToken);

                const userResponse = await connectUserHandle(loginResponse.data.accessToken);

                console.log(userResponse?.data)
                
                if(userResponse?.data.success) {
                    dispatch(addUserHandle(userResponse.data.user));
                    router.back()
                }

            }
        } catch (error: any) {
            setIsError(
                error.response?.data?.message ?? "An unknown error occurred"
            );
            setTimeout(() => {
                setIsError(null);
            }, 5000);
        }
    };

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("container")}>
                    <div className={cx("content-auth")}>
                        <div className={cx("grid-form")}>
                            <form
                                className={cx("form-login")}
                                onSubmit={handleSubmitFormLoginUser}
                            >
                                <div className={cx("form-header")}>
                                    <div className={cx("header-title")}>
                                        <span
                                            className={cx("header-under-line")}
                                        ></span>{" "}
                                        <h3>Đăng nhập</h3>
                                    </div>
                                </div>

                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-login-username"
                                        className={cx("form-title")}
                                    >
                                        Tài khoản
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-login-username"
                                            name="accout"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-login-password"
                                        className={cx("form-title")}
                                    >
                                        Mật khẩu
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-login-password"
                                            type="password"
                                            name="password"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>

                                <div className={cx("form-action")}>
                                    <input id="inputMemo" type="checkbox" />
                                    <label
                                        className={cx("text-checkInput")}
                                        htmlFor="inputMemo"
                                    >
                                        Ghi nhớ đăng nhập
                                    </label>
                                </div>

                                {!!isError && (
                                    <div className={cx("message-error")}>
                                        {isError}
                                    </div>
                                )}

                                <div className={cx("form-group-button")}>
                                    <button
                                        className={cx(
                                            "button-auth",
                                            "auth-submit-form"
                                        )}
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                            <div className={cx("form-devider")}>
                                <div className={cx("text")}>Đăng nhập bằng</div>
                                <div className={cx("devider-line")}></div>
                            </div>
                            <div
                                className={cx(
                                    "form-group-button",
                                    "login-with-social"
                                )}
                            >
                                <button
                                    className={cx("button-auth", "auth-google")}
                                    onClick={handleSignIn}
                                    name="google"
                                >
                                    <span className={cx("grid-icon")}>
                                        {iconGoogle}
                                    </span>
                                    Google
                                </button>
                                <button
                                    className={cx(
                                        "button-auth",
                                        "auth-facebook"
                                    )}
                                    name="facebook"
                                >
                                    <span className={cx("grid-icon")}>
                                        {iconFacebook}
                                    </span>
                                    Facebook
                                </button>
                                <button
                                    className={cx("button-auth", "auth-github")}
                                    name="github"
                                >
                                    <span className={cx("grid-icon")}>
                                        {iconGithub}
                                    </span>
                                    Github
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx("content-side")}></div>
                </div>
            </div>
        </>
    );
};

export default FormLogin;
