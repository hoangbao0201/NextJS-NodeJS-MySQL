import { GetServerSideProps, NextPage } from "next";

import FormHome from "@/components/Shared/FormHome";
import WrapperContent from "@/components/Layouts/WrapperContent";
import { NovelType } from "@/types";
import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { getNovelsByPageHandle } from "@/services/novel.services";

interface HomeProps {
    novels?: NovelType[];
}

const Home: NextPageWithLayout = ({ novels }: HomeProps) => {

    console.log(novels || null)

    return (
        <>
            <WrapperContent>
                <FormHome novels={novels} />
            </WrapperContent>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const novelResponse = await getNovelsByPageHandle(ctx.query?.page as string || "1");

    return {
        props: {
            novels: novelResponse?.data.novels || null,
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
