import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";

export interface CreatorBookPageProps {}

const CreatorBookPage = () => {
    return (
        <>
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
            tab="novels/issues"
            title="Báo lỗi"
            description="Dù báo lỗi đúng hay sai nhớ đều phải trả lời để BTV có thể đóng báo lỗi"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorBookPage;
