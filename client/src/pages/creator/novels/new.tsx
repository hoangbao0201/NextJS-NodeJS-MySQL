import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormNewNovel from "@/components/Shared/FormCreatorNovel/ContentFormNewNovel";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";

export interface CreatorBookPageProps {}

const CreatorBookPage = () => {
    return (
        <>
            <ContentFormNewNovel />
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

CreatorBookPage.getLayout = (page: ReactNode) => {
    return (
        <FormCreatorNovel
            tab="novels/new"
            title="Thêm truyện mới"
            description="Bắt đầu sáng tạo thế giới của riêng bạn"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorBookPage;
