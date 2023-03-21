import { GetServerSideProps, NextPage } from "next";

import WrapperContent from "@/components/Layouts/WrapperContent";
import FormChapterDetail from "@/components/Shared/FormChapterDetail";
import { ChapterType } from "@/types";
import dynamic from "next/dynamic";
import { getChapterDetailHandle, increaseViewChapterHandle } from "@/services/chapter.services";

const ScrollButton = dynamic(() => import("@/components/Layouts/ScrollOnTop"))

export interface ChapterDetailProps {
    chapter: any
}

const ChapterDetail : NextPage<ChapterDetailProps> = ({chapter}) => {

    console.log(chapter)

    return (
        <>
            <ScrollButton />
            <WrapperContent width="1170px" bgColor="#eae4d3">
                <FormChapterDetail chapter={chapter}/>
            </WrapperContent>
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async ({ query, res }) => {
    const slug = query.slug as string
    const chapterNumber = query.chapterNumber as string

    const chapterResponse = await getChapterDetailHandle(slug, chapterNumber)
    increaseViewChapterHandle(slug, chapterNumber)

    if(!chapterResponse) {
        return {
            props: {
                chapter: null
            }
        }
    }

    return {
        props: {
            chapter: chapterResponse.data?.chapter || null
        }
    }

}

export default ChapterDetail;