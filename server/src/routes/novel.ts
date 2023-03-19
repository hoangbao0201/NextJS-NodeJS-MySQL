import express from "express"
const router = express.Router()

import { verifyToken } from "../middleware/verifyToken";
import { createNovelByData, createNovelByUrl, getNovelByPage, getNovelByTitle } from "../controllers/NovelController";



router.post("/create/data", verifyToken, createNovelByData);
router.post("/create/url", verifyToken, createNovelByUrl);

router.get("/search-by-page/:page", getNovelByPage);
router.get("/search-by-title/:title", getNovelByTitle);



export default router;