import { ReactNode } from "react";
import { GetServerSideProps } from "next";

import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";


export interface CreatorDraftsPageProps {}

const CreatorDraftsPage= () => {

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

CreatorDraftsPage.getLayout = (page: ReactNode) => {
    return (
        <FormCreatorNovel
            tab="drafts"
            title="Các bản thảo"
            description="Đây là tập hợp danh sách các bản thảo chưa xuất bản của bạn"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorDraftsPage;
