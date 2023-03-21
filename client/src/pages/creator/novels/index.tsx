import { GetServerSideProps, NextPage } from "next";
import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormMyNovels from "@/components/Shared/FormCreatorNovel/ContentFormMyNovels";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";
import { getNovelsByUserIdHandle } from "@/services/novel.services";

interface CreatorNovelsPageProps {
    novels?: any;
}

const CreatorNovelsPage = ({ novels } : CreatorNovelsPageProps) => {
    return (
        <>
            {novels ? (
                <ContentFormMyNovels novels={novels} />
            ) : (
                <p>Bạn chưa đăng tải truyện nào</p>
            )}
        </>
    );
};

export const getServerSideProps : GetServerSideProps = async (ctx) => {

    const token = getAccessTokenOnServer(ctx.req.headers.cookie as string)
    const userResponse = await connectUserHandle(token as string);

    if(!userResponse?.data.success) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    const novels = await getNovelsByUserIdHandle(userResponse.data.user.userId as string)
    if(novels?.data.success) {
        return {
            props: {
                novels: novels.data.novels || null
            }
        }
    }

    return {
        props: {}
    }
}

CreatorNovelsPage.getLayout = (page: ReactNode) => {
    return (
        <FormCreatorNovel
            tab="novels"
            title="Truyện của tôi"
            description="Danh sách các truyện bạn đã đăng"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorNovelsPage;
