import bcrypt from "bcryptjs";

import connectMySQL from "../library/connectMySQL";

export const checkUserCreatedHandle = ({ username, email }: any) => {
    return new Promise((resolve, reject) => {
        const qGetUser =
            "SELECT username FROM USERS WHERE username = ? OR email = ?";
        connectMySQL.query(qGetUser, [username, email], (error, data: any) => {
            if (error) {
                reject({
                    success: false,
                    code: 500,
                    message: "Create User Error | Check User",
                    error: error,
                });
            } else {
                if (data.length) {
                    resolve({
                        success: false,
                        code: 400,
                        message: "Existing User",
                    });
                } else {
                    resolve({
                        success: true,
                        message: "User not found",
                    });
                }
            }
        });
    });
};

export const createUserHandle = ({ name, username, email, password }: any) => {
    return new Promise((resolve, reject) => {
        // Hash password
        const hashPassword = bcrypt.hashSync(password, 10);
        const valuesCreateUser = [name, username, email, hashPassword];

        const qCreateUser =
            "INSERT INTO USERS(`name`, `username`, `email`, `password`) VALUES (?)";

        connectMySQL.query(qCreateUser, [valuesCreateUser], (error, data) => {
            if (error) {
                reject({
                    success: false,
                    code: 400,
                    message: "Create User Error | Create User",
                    error: error,
                });
            } else {
                resolve({
                    success: true,
                    message: "Register successful",
                    data: data,
                });
            }
        });
    });
};