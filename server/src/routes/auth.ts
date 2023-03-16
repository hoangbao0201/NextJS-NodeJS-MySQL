import express from "express"
const router = express.Router()

import { registerUser } from "../controllers/AuthController";


router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/", deserializeUser, connectUser)



export default router;