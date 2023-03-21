import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import WrapperContent from "@/components/Layouts/WrapperContent";
import FormNovelDetail from "@/components/Shared/FormNovelDetail";
import { GetServerSideProps } from "next";
import { NovelType } from "@/types";
import { ParsedUrlQuery } from "querystring";
import Slider from "@/components/partials/Slider";
import { getNovelBySlugHandle } from "@/services/novel.services";

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface NovelDetailProps {
    novel?: NovelType
}

const NovelDetail = ({ novel } : NovelDetailProps) => {

    console.log(novel)
    
    return (
        <>
            <Slider />
            <WrapperContent width="1170px" top="translateY(-130px)" borderRadius="8px">
                <FormNovelDetail novel={novel}/>
            </WrapperContent>
        </>
    );
}

// export const getStaticProps : GetStaticProps<NovelDetailProps, Params> = async (ctx) => {
//     try {
//         const { slug } = ctx.params as Params

//         const novelResponse = await getNovelBySlugHandle(slug as string)

//         if(novelResponse) {
//             return {
//                 props: {
//                     novel: JSON.parse(JSON.stringify(novelResponse.data?.novel)),
//                 },
//                 revalidate: REVALIDATE_TIME,
//             };
//         }
//         return { notFound: true };

//     } catch (error) {
//         return { notFound: true };
//     }
// }

// export const getStaticPaths : GetStaticPaths<Params> = () => {
//     return {
//         paths: [],
//         fallback: true
//     }
// }

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    try {
        const { slug } = ctx.params as Params

        const novelResponse = await getNovelBySlugHandle(slug as string)

        if(novelResponse) {
            return {
                props: {
                    novel: JSON.parse(JSON.stringify(novelResponse.data?.novel)),
                },
            };
        }
        return { notFound: true };

    } catch (error) {
        return { notFound: true };
    }
}

export default NovelDetail

NovelDetail.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};
