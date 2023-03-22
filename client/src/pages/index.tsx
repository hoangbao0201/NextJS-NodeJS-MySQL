import { ReactNode } from "react";
import { NovelType } from "@/types";
import { GetServerSideProps } from "next";

import FormHome from "@/components/Shared/FormHome";
import WrapperContent from "@/components/Layouts/WrapperContent";
import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { getNovelsByPageHandle } from "@/services/novel.services";
import Slider from "@/components/partials/Slider";

export interface HomeProps {
    novels?: NovelType[]
    newNovels?: NovelType[]
}

const Home: NextPageWithLayout = ({ novels, newNovels }: HomeProps) => {

    return (
        <>
            <Slider />
            <WrapperContent width="1170px" top="translateY(-130px)" borderRadius="8px">
                <FormHome novels={novels} newNovels={newNovels}/>
            </WrapperContent>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const novelsResponse = await getNovelsByPageHandle(ctx.query?.page as string || "1");
    const newNovelsResponse = await getNovelsByPageHandle("1");

    return {
        props: {
            novels: novelsResponse?.data.novels || null,
            newNovels: newNovelsResponse?.data.novels || null
        },
    };
};

export default Home;

Home.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};
