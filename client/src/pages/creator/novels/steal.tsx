import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import ContentFormSteal from "@/components/Shared/FormCreatorNovel/ContentFormSteal";
import { connectUserHandle } from "@/services/user.services";

export interface CreatorNovelPageProps {}

const CreatorNovelPage = () => {
    return (
        <>
            <ContentFormSteal />
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

    return {
        props: {}
    }
}

CreatorNovelPage.getLayout = (page: ReactNode) => {
    return (
        <FormCreatorNovel
            tab="novels/steal"
            title="Cào truyện theo url"
            description="Hiện tại chỉ có thể lấy novel của metruyenchu"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorNovelPage;
