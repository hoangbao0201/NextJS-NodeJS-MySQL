import classNames from "classnames/bind";
import styles from "./FormRegister.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";


import { iconFacebook, iconGithub, iconGoogle } from "public/icons";
import { useSelector } from "react-redux";
import router from "next/router";
import { registerUserHandle } from "@/services/user.services";

const cx = classNames.bind(styles);

export interface FormRegisterProps {}

const FormRegister = () => {
    const { isAuthenticated } = useSelector((state : any) => state.user)

    const [isError, setIsError] = useState<any>(null);
    const [dataForm, setDataForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitFormRegisterUser = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            const registerResponse = await registerUserHandle(dataForm as any);

            if (registerResponse?.data.success) {
                router.push("/auth/login");
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

    useEffect(() => {
        if(isAuthenticated) {
            router.push("/")
        }
    }, [])

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("container")}>

                    <div className={cx("content-auth")}>
                        <div className={cx("grid-form")}>
                            <form
                                className={cx("form-register")}
                                onSubmit={handleSubmitFormRegisterUser}
                            >
                                <div className={cx("form-header")}>
                                    <div className={cx("header-title")}>
                                        <span
                                            className={cx("header-under-line")}
                                        ></span>{" "}
                                        <h3>Đăng kí</h3>
                                    </div>
                                </div>

                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-name"
                                        className={cx("form-title")}
                                    >
                                        Họ và tên
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-name"
                                            value={dataForm.name}
                                            name="name"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-username"
                                        className={cx("form-title")}
                                    >
                                        Tên tài khoản
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-username"
                                            value={dataForm.username}
                                            name="username"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-email"
                                        className={cx("form-title")}
                                    >
                                        Email
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-email"
                                            value={dataForm.email}
                                            name="email"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-password"
                                        className={cx("form-title")}
                                    >
                                        Mật khẩu
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-password"
                                            type="password"
                                            value={dataForm.password}
                                            name="password"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-rePassword"
                                        className={cx("form-title")}
                                    >
                                        Nhập lại mật khẩu
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-rePassword"
                                            type="password"
                                            value={dataForm.rePassword}
                                            name="rePassword"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>

                                {!!isError && (
                                    <div className={cx("message-error")}>
                                        {isError}
                                    </div>
                                )}

                                <div
                                    className={cx(
                                        "form-group-button",
                                        "grid-button-submit"
                                    )}
                                >
                                    <button
                                        className={cx(
                                            "button-auth",
                                            "auth-submit-form"
                                        )}
                                    >
                                        Đăng kí
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
                                >
                                    <span className={cx("grid-icon")}>
                                        {iconFacebook}
                                    </span>
                                    Facebook
                                </button>
                                <button
                                    className={cx("button-auth", "auth-github")}
                                >
                                    <span className={cx("grid-icon")}>
                                        {iconGithub}
                                    </span>
                                    Github
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormRegister;
