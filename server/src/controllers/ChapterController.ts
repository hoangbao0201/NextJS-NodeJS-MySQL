import { Request, Response } from "express";
import { createChapterByDataHandle, getDataChapterByUrlMTCHandle } from "../services/chapter.services";

// Create Novel By Data | /api/novels/create/data
export const createChapterByUrl = async (req: Request, res: Response) => {
    try {
        const { slug, chapterNumber } = req.params
        if(!slug || !chapterNumber) {
            return res.status(400).json({
                success: false,
                message: "Data not found"
            })
        }

        const getDataChapter : any = await getDataChapterByUrlMTCHandle({ slug, chapterNumber: Number(chapterNumber) });
        if(!getDataChapter) {
            return res.status(400).json({
                success: false,
                message: "Value invalid"
            })
        }

        const createChapter : any = await createChapterByDataHandle(getDataChapter)
        if(!createChapter) {
            return res.status(400).json({
                success: false,
                message: "Create chapter error"
            })
        }

        return res.json({
            success: true,
            message: "Create novel successful",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}
