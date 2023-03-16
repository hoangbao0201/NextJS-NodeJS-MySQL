import { Request, Response } from "express";

import { checkUserCreatedHandle, createUserHandle } from "../services/user.services";


export const registerUser = async (req: Request, res: Response) => {
    try {

        const { name, username, email, password } = req.body
        if(!name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Data not found"
            })
        }

        const checkUser : any = await checkUserCreatedHandle({ username, email })
        if(!checkUser.success) {
            return res.status(checkUser.code).json(checkUser)
        }

        const createUser : any = await createUserHandle({name, username, email, password})
        if(!createUser.success) {
            return res.status(checkUser.code).json(checkUser)
        }

        return res.json({
            success: true,
            message: "Create User successful"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}

