import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormDraftsNew from "@/components/Shared/FormCreatorNovel/ContentFormDraftsNew";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";

export interface CreatorNovelPageProps {}

const CreatorNovelPage = () => {
    return (
        <>
            <ContentFormDraftsNew />
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
            tab="drafts/new"
            title="Thêm bản thảo"
            description="Bạn có thể thêm bản thảo và xuất bản nó ngay lập tức ở đây, hoặc đơn giản chỉ muốn viết một đoạn và để nó tự lưu lại"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorNovelPage;
