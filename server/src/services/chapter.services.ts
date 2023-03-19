import axios from "axios";
import * as cheerio from "cheerio";

import connectMySQL from "../library/connectMySQL";

export const getDataChapterByUrlMTCHandle = async ({ slug, chapterNumber } : any) => {
    try {
        const connection = await connectMySQL();

        // Get Data Chapter
        let urlChapter = `https://metruyencv.com/truyen/${slug}/chuong-${chapterNumber}`
 
        const response = await axios.get(urlChapter);
        const $1 = cheerio.load(response.data);

        let title = $1('div.nh-read__title').text()
        const titleIndex = title.indexOf(":")
        const convertTitle = title.slice(titleIndex+1).trim();

        const dataChapter = {
            novelSlug: slug,
            title: convertTitle,
            content: $1('div#article').html(),
            chapterNumber: Number(chapterNumber),
        }

        // Check novel
        const qGetNovelBySlug = `
            SELECT novelId FROM novels
            WHERE slug = ?
        `
        const [rows] : any = await connection.query(qGetNovelBySlug, [slug]);
        
        connection.release();
        
        if(!rows.length) {
            return null
        }

        return {
            ...dataChapter,
            novelId: rows[0].novelId,
        };

    } catch (error) {
        return null
    }
}

export const createChapterByDataHandle = async (data : any) => {
    try {
        const connection = await connectMySQL();

        const {
            novelSlug, title, content, chapterNumber, novelId
        } = data

        // return {
        //     novelSlug, title, content, chapterNumber, novelId
        // }

        const qCreateChapter = `
            INSERT INTO chapters(novelSlug, title, content, chapterNumber, novelId)
            VALUES (?)
        `;

        const values = [ novelSlug, title, content, chapterNumber, novelId ]

        const [rows] = await connection.query(qCreateChapter, [values]);

        connection.release();

        return rows
    } catch (error) {
        return error
    }
};