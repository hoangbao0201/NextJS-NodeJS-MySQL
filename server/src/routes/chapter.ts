import express from "express"
import { createChapterByUrl } from "../controllers/ChapterController";
const router = express.Router()

import { verifyToken } from "../middleware/verifyToken";



router.post("/create-by-url/:slug/:chapterNumber", verifyToken, createChapterByUrl);


export default router;