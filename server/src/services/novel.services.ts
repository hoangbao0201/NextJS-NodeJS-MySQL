import axios from "axios";
import * as cheerio from "cheerio";


import connectMySQL from "../library/connectMySQL";
import { convertTextToSlug } from "../utils/convertTextToSlug";
// import { uploadThumbnailNovelByUrlHandle } from "./image.services";

export const createNovelByDataHandle = async (data : any, userId : any) => {
    try {
        const connection = await connectMySQL();

        const qCreateNovel = `
            INSERT INTO novels(slug, title, description, author, category, personality, scene, classify, viewFrame, userId)
            VALUES (?)
        `;

        const {
            title, description, author, category, personality, scene, classify, viewFrame
        } = data
         
        const hashTitle = convertTextToSlug(title as string)
        const values = [hashTitle, title, description, author, category, personality, scene, classify, viewFrame, userId]

        const [rows] = await connection.query(qCreateNovel, [values]);

        connection.release();

        return rows
    } catch (error) {
        return error
    }
};

export const getDataNovelByUrlMTCHandle = async (url : string) => {
    try {
        const response1 = await axios.get(url);
        const $1 = cheerio.load(response1.data);

        const dataNovel = {
            title: $1('h1.h3.mr-2>a').text().trim(),
            slug: convertTextToSlug($1('h1.h3.mr-2>a').text()),
            description: $1('div.content').html(),
            author: $1('ul.list-unstyled.mb-4>li').eq(0).find('a').text().trim(),
            category: $1('ul.list-unstyled.mb-4>li').eq(2).find('a').text().trim(),
            personality: $1('ul.list-unstyled.mb-4>li').eq(3).find('a').text().trim(),
            scene: $1('ul.list-unstyled.mb-4>li').eq(4).find('a').text().trim(),
            classify: $1('ul.list-unstyled.mb-4>li').eq(5).find('a').text().trim(),
            viewFrame: $1('ul.list-unstyled.mb-4>li').eq(6).find('a').text().trim(),
        }

        if(!dataNovel.title || !dataNovel.slug || !dataNovel.description || !dataNovel.author) {
            return null
        }

        // const urlImage = $1('.nh-thumb--210 img').attr('src');
        // const thumbnailImage = await uploadThumbnailNovelByUrlHandle(urlImage as string);

        return {
            ...dataNovel,
            // thumbnail: {
            //     url: thumbnailImage.url || null,
            //     publicId: thumbnailImage.public_id || null,
            // },
        }
    } catch (error) {
        return null
    }
}

export const getNovelByTitleHandle = async (title : any) => {
    try {
        const connection = await connectMySQL();

        const qGetNovel = `
            SELECT novelId, title, author, category, personality, scene, classify, viewFrame FROM novels
            WHERE title like ?
            LIMIT 10
        `;

        const [rows] = await connection.query(qGetNovel, [`%${title}%`]);

        connection.release();

        return rows
    } catch (error) {
        return null
    }
};

export const getNovelByPageHandle = async (page : any) => {
    try {
        const connection = await connectMySQL();

        const qGetNovel = `
            SELECT novelId, title, author, category, personality, scene, classify, viewFrame FROM novels
            ORDER BY createAt DESC
            LIMIT 10 OFFSET ?;
        `;

        const [rows] = await connection.query(qGetNovel, [(page-1)*10]);

        connection.release();

        return rows
    } catch (error) {
        return null
    }
};




