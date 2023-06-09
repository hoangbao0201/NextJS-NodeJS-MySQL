import axios from "axios";



export const createChapterByUrlHandle = async (slug: string, token: string) => {
    try {
        if(!slug || !token) {
            return null
        }
    
        const chapter = await axios.post(`http://localhost:4000/api/chapters/create-by-url/${slug}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        if(chapter.data.success) {
            return chapter
        }
    
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getChaptersNovelByUrlHandle = async (slug: string) => {
    try {
        if(!slug) {
            return null;
        }

        const chapter = await axios.get(`http://localhost:4000/api/novels/${slug}/chapters`);
        if(chapter.data.success) {
            return chapter;
        }
    
        return null;
    } catch (error) {
        return null;
    }
}

export const getChapterDetailHandle = async (slug: string, chapterNumber: string) => {
    try {
        if(!slug || !chapterNumber) {
            return null;
        }
        const chapter = await axios.get(`http://localhost:4000/api/chapters/chapter-detail/${slug}/${chapterNumber}`);
        if(chapter.data.success) {
            return chapter;
        }
    
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const increaseViewChapterHandle = (slug: string, chapterNumber: string) => {
    try {
        if(!slug || !chapterNumber) {
            return null
        }
        axios.get(`http://localhost:4000/api/chapters/increase-view/${slug}/${chapterNumber}`)
    } catch (error) {
        console.log(error)
    }
}