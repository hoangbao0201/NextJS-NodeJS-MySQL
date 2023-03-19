import express from "express"
const router = express.Router()

import { verifyToken } from "../middleware/verifyToken";
import { connectUser, getUserById, getUserByUsername } from "../controllers/UserController";




router.get("/", verifyToken, connectUser);

router.get("/id/:id", getUserById)
router.get("/username/:username", getUserByUsername)



export default router;